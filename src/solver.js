//扫雷确定性推理：子集规则（Subset Rule）
//
//单格规则只能处理“一个数字格的未知邻居全确定”的情况，
//子集规则利用两个数字格约束之间的包含关系做差集推断：
//  若 A 的未知邻居集合是 B 的未知邻居集合的子集，
//  则 B\A 这部分格子中恰好有 (B剩余雷数 - A剩余雷数) 颗雷。
//  差集里全是雷 -> 全部标记；差集里一颗雷都没有 -> 全部挖开。
//这条规则覆盖了 1-1、1-2-1、1-2-2-1 等全部经典固定模式。

const VALUE_MINE = 9;
const DIGGED = 0x80;
const MARKED = 0x40;

function getNeighbourCoords(rows, cols, row0, col0) {
    let result = [];
    for (let row = row0 - 1; row <= row0 + 1; row++) {
        for (let col = col0 - 1; col <= col0 + 1; col++) {
            if (row < 0 || row >= rows || col < 0 || col >= cols || (row === row0 && col === col0)) {
                continue;
            }
            result.push({row, col});
        }
    }
    return result;
}

//收集所有已挖开数字格的约束，每项为 {mineCount, unknown}
//mineCount 是未知邻居里还剩几颗雷（已扣除当前标了旗的格子），
//unknown 是未挖开且未标旗的邻居编号集合（编号 = row * cols + col）
function collectConstraints(board) {
    let rows = board.length, cols = board[0].data.length;
    let constraints = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let cell = board[row].data[col];
            if (!(cell.value & DIGGED)) {
                continue;
            }
            let counter = cell.value & 0x0f;
            if (VALUE_MINE === counter) {
                continue;
            }
            let unknown = new Set(), marked = 0;
            for (let {row: row1, col: col1} of getNeighbourCoords(rows, cols, row, col)) {
                let value = board[row1].data[col1].value;
                if (value & MARKED) {
                    marked++;
                } else if (!(value & DIGGED)) {
                    unknown.add(row1 * cols + col1);
                }
            }
            //旗子标错时约束本身就不成立，跳过该数字格，避免推出错误结论
            if (0 === unknown.size || counter - marked < 0 || counter - marked > unknown.size) {
                continue;
            }
            constraints.push({
                mineCount: counter - marked,
                unknown
            });
        }
    }
    return constraints;
}

function isSubset(small, big) {
    for (let id of small) {
        if (!big.has(id)) {
            return false;
        }
    }
    return true;
}

//返回当前局面下子集规则能确定的动作
//marks: 一定是雷的格子；digs: 一定是安全的格子
export function findCertainActions(board) {
    let rows = board.length, cols = board[0].data.length;
    let constraints = collectConstraints(board);
    let marks = new Set(), digs = new Set();

    for (let i = 0; i < constraints.length; i++) {
        let a = constraints[i];
        for (let j = 0; j < constraints.length; j++) {
            if (i === j) {
                continue;
            }
            let b = constraints[j];
            //差集必须非空，否则没有新信息
            if (a.unknown.size >= b.unknown.size || !isSubset(a.unknown, b.unknown)) {
                continue;
            }
            let diff = [];
            for (let id of b.unknown) {
                if (!a.unknown.has(id)) {
                    diff.push(id);
                }
            }
            let mineCount = b.mineCount - a.mineCount;
            if (0 === mineCount) {
                diff.forEach(id => digs.add(id));
            } else if (mineCount === diff.length) {
                diff.forEach(id => marks.add(id));
            }
        }
    }

    //同一个格子既被推断为雷又被推断为安全，说明盘面上的旗子有误，此时只保留标雷动作
    let marks_ = [];
    for (let id of marks) {
        marks_.push({row: Math.floor(id / cols), col: id % cols});
    }
    let digs_ = [];
    for (let id of digs) {
        if (!marks.has(id)) {
            digs_.push({row: Math.floor(id / cols), col: id % cols});
        }
    }
    return {marks: marks_, digs: digs_};
}

//枚举节点预算，所有分量共享。用完就放弃推断，
//放弃只是“推不出来”，不会给出错误结论。
//专家局边界约 300 格时，5 万节点约 4ms，再往上加收益迅速变小。
const ENUM_NODE_LIMIT = 50000;

//枚举一个连通分量内所有满足约束的布雷方案，
//按“雷数”分组累加统计，避免把每个方案都存下来。
//order 是赋值顺序：越紧的约束里的变量越先赋值，剪枝能更早生效。
function enumerateComponent(vars, cons, varCons, order, budget) {
    let n = vars.length;
    let rem = cons.map(c => c.mines);
    let left = cons.map(c => c.vars.length);
    let assign = new Uint8Array(n);
    let groups = new Map();
    let overflow = false;

    const record = () => {
        let mineCount = 0;
        for (let j = 0; j < n; j++) {
            if (assign[j]) {
                mineCount++;
            }
        }
        let group = groups.get(mineCount);
        if (!group) {
            group = {count: 0, ones: new Int32Array(n)};
            groups.set(mineCount, group);
        }
        group.count++;
        for (let j = 0; j < n; j++) {
            if (assign[j]) {
                group.ones[j]++;
            }
        }
    };

    const rec = pos => {
        if (overflow || ++budget.nodes > ENUM_NODE_LIMIT) {
            overflow = true;
            return;
        }
        if (pos === n) {
            record();
            return;
        }
        let index = order[pos];
        //先试“是雷”，通常剪枝更快
        for (let value = 1; value >= 0; value--) {
            let ok = true;
            for (let ci of varCons[index]) {
                rem[ci] -= value;
                left[ci]--;
                //已分配的雷数超出约束，或剩余格子不够放雷，都可以直接剪掉
                if (rem[ci] < 0 || rem[ci] > left[ci]) {
                    ok = false;
                }
            }
            if (ok) {
                assign[index] = value;
                rec(pos + 1);
            }
            for (let ci of varCons[index]) {
                rem[ci] += value;
                left[ci]++;
            }
            assign[index] = 0;
            if (overflow) {
                return;
            }
        }
    };
    rec(0);
    return {groups, overflow, n};
}

//边界枚举：
//把每个已挖开数字格当作一条约束，穷举边界上所有满足约束的布雷方案，
//再用“全局剩余雷数”筛掉凑不出总雷数的方案。
//在所有可行方案中都是雷的格子一定可以标旗，在所有可行方案中都安全的格子一定可以挖开。
//minesLeft 是剩余雷数（总雷数 - 已标旗数），不传则只用分量内部约束。
export function findCertainActionsByEnumeration(board, minesLeft) {
    let rows = board.length, cols = board[0].data.length;
    let result = {marks: [], digs: []};
    let constraints = collectConstraints(board);
    if (!constraints.length) {
        return result;
    }

    //边界格统一编号
    let indexOf = new Map(), varIds = [];
    for (let constraint of constraints) {
        for (let id of constraint.unknown) {
            if (!indexOf.has(id)) {
                indexOf.set(id, varIds.length);
                varIds.push(id);
            }
        }
    }

    //约束转成变量下标
    let cons = constraints.map(constraint => ({
        vars: [...constraint.unknown].map(id => indexOf.get(id)),
        mines: constraint.mineCount
    }));
    let varCons = Array.from({length: varIds.length}, () => []);
    cons.forEach((constraint, index) => {
        constraint.vars.forEach(v => varCons[v].push(index));
    });

    //约束按“共享变量”拆成互不影响的连通分量
    let compOfCons = new Array(cons.length).fill(-1);
    let comps = [];
    for (let i = 0; i < cons.length; i++) {
        if (compOfCons[i] >= 0) {
            continue;
        }
        let comp = {cons: [], vars: [], groups: null, overflow: false, n: 0};
        let stack = [i], varSet = new Set();
        compOfCons[i] = comps.length;
        while (stack.length) {
            let index = stack.pop();
            comp.cons.push(index);
            for (let v of cons[index].vars) {
                if (varSet.has(v)) {
                    continue;
                }
                varSet.add(v);
                for (let next of varCons[v]) {
                    if (compOfCons[next] < 0) {
                        compOfCons[next] = comps.length;
                        stack.push(next);
                    }
                }
            }
        }
        comp.vars = [...varSet];
        comps.push(comp);
    }

    //逐个分量枚举，所有分量共享同一份节点预算
    let budget = {nodes: 0};
    comps.forEach(comp => {
        let local = new Map();
        comp.vars.forEach((v, i) => local.set(v, i));
        let localCons = comp.cons.map(index => ({
            vars: cons[index].vars.map(v => local.get(v)),
            mines: cons[index].mines
        }));
        let localVarCons = comp.vars.map(() => []);
        localCons.forEach((constraint, index) => {
            constraint.vars.forEach(v => localVarCons[v].push(index));
        });
        //变量排序：所属约束最小的先赋值
        let tightness = localVarCons.map(list => {
            let size = Infinity;
            for (let index of list) {
                size = Math.min(size, localCons[index].vars.length);
            }
            return size;
        });
        let order = comp.vars.map((v, i) => i);
        order.sort((a, b) => tightness[a] - tightness[b]);
        let enumerated = enumerateComponent(comp.vars, localCons, localVarCons, order, budget);
        comp.groups = enumerated.groups;
        comp.overflow = enumerated.overflow;
        comp.n = enumerated.n;
    });

    //不与任何数字格相邻的未挖开格，放几颗雷都行，只是要凑够总雷数
    let frontier = new Set(varIds);
    let freeCells = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let value = board[row].data[col].value;
            if ((0xC0 & value) || frontier.has(row * cols + col)) {
                continue;
            }
            freeCells++;
        }
    }

    //有分量枚举超限时，全局雷数无法精确合并，退化为只看分量自身约束
    let useGlobal = 'number' === typeof minesLeft && minesLeft >= 0 && !comps.some(comp => comp.overflow);
    let total = useGlobal ? minesLeft : 0;

    //除 skip 之外，其他分量能凑出的雷数集合
    const reachableExcept = skip => {
        let reach = new Uint8Array(total + 1);
        reach[0] = 1;
        for (let comp of comps) {
            if (comp === skip || comp.overflow) {
                continue;
            }
            let next = new Uint8Array(total + 1);
            for (let k = 0; k <= total; k++) {
                if (!reach[k]) {
                    continue;
                }
                for (let mineCount of comp.groups.keys()) {
                    if (k + mineCount <= total) {
                        next[k + mineCount] = 1;
                    }
                }
            }
            reach = next;
        }
        return reach;
    };

    for (let comp of comps) {
        if (comp.overflow) {
            continue;
        }

        //分量自身的雷数 m 是否可能：其他分量凑出 k，k+m 与剩余雷数的差额由自由格填满
        let feasible;
        if (useGlobal) {
            let reach = reachableExcept(comp);
            feasible = new Set();
            for (let k = 0; k <= total; k++) {
                if (!reach[k]) {
                    continue;
                }
                for (let mineCount of comp.groups.keys()) {
                    let used = k + mineCount;
                    if (used <= total && total - used <= freeCells) {
                        feasible.add(mineCount);
                    }
                }
            }
        } else {
            feasible = new Set(comp.groups.keys());
        }

        let count = 0, ones = new Int32Array(comp.n);
        for (let mineCount of feasible) {
            let group = comp.groups.get(mineCount);
            if (!group) {
                continue;
            }
            count += group.count;
            for (let j = 0; j < comp.n; j++) {
                ones[j] += group.ones[j];
            }
        }
        if (!count) {
            continue;
        }

        for (let j = 0; j < comp.n; j++) {
            let id = varIds[comp.vars[j]];
            let row = Math.floor(id / cols), col = id % cols;
            if (0 === ones[j]) {
                result.digs.push({row, col});
            } else if (ones[j] === count) {
                result.marks.push({row, col});
            }
        }
    }

    return result;
}
