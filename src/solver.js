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
