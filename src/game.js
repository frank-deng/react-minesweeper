import {Component, createRef} from 'react';
import Cell from './cell';
import {findCertainActions} from './solver';
import {writeLog} from './logManager';
import SettingDialog from './settingDialog.js';
import { Translation } from 'react-i18next';

export const VALUE_MINE=9;
export default class GamePage extends Component{
  state={
    width:null,
    height:null,
    mines:null,
    board:[],
    operation:[],
    status:'initial'
  };
  $refs={
    settingDialog:createRef()
  }
  constructor(){
      super();
  }
  openSetting=async()=>{
    try{
      let data = await this.$refs.settingDialog.current.open({
        width:this.state.width,
        height:this.state.height,
        mines:this.state.mines
      });
      await this.setState(data);
      this.startGame();
      localStorage.setItem('react-minesweeper-settings',JSON.stringify(data));
    }catch(e){
      if('cancel'!==e){
        console.error(e);
      }
    }
  }
  startGame=()=>{
    let board=[], width=this.state.width, height=this.state.height;
    for(let row=0;row<height;row++){
        let array=[];
        for(let col=0;col<width;col++){
            array.push({
                key:Math.random(),
                row,
                col,
                value:0
            });
        }
        board.push({
            key:Math.random(),
            data:array
        });
    }
    this.setState({
      board,
      operation:[],
      status:'initial'
    });
  }
  getNeighbours(rows,cols,row0,col0){
    let result=[];
    for(let row=row0-1; row<=row0+1; row++){
      for(let col=col0-1; col<=col0+1; col++){
        if(row<0 || row>=rows || col<0 || col>=cols || (row===row0 && col===col0)){
          continue;
        }
        result.push({
          row,col
        });
      }
    }
    return result;
  }
  getNeighbourMineCount(target,row0,col0){
      let rows=target.length, cols=target[0].data.length, count=0,row,col;
      for({row,col} of this.getNeighbours(rows,cols,row0,col0)){
          let cell=target[row].data[col];
          if(VALUE_MINE===(cell.value&0xf)){
              count++;
          }
      }
      return count;
  }
  initMines(target,mineCount,y,x){
      let rows=target.length, cols=target[0].data.length;
      if(mineCount >= rows*cols){
        throw new RangeError('Too many mines');
      }

      let cellList=[];
      for(let row=0; row<rows; row++){
        for(let col=0; col<cols; col++){
          //跳过被点击的位置
          if(y===row && x===col){
            continue;
          }

          cellList.push({
            row,col
          });
        }
      }

      //对坐标列表进行洗牌
      let length=cellList.length;
      for(let i=0; i<length; i++){
        if(Math.random()>0.5){
          continue;
        }
        let j=Math.floor(Math.random()*(length-i-1))+i+1;
        if(cellList[j]){
          let temp=cellList[i];
          cellList[i]=cellList[j];
          cellList[j]=temp;
        }
      }

      //布雷
      for(let i=0; i<mineCount && cellList.length; i++){
        let iCell=Math.floor(Math.random()*(cellList.length-1));
        try{
          let {row,col}=cellList[iCell];
          target[row].data[col].value=VALUE_MINE;
          cellList.splice(iCell,1);
        }catch(e){
          console.error(iCell,cellList.length,cellList[iCell]);
        }
      }

      //标上数字
      for(let row=0; row<rows; row++){
        for(let col=0; col<cols; col++){
          let cell=target[row].data[col];
          if(VALUE_MINE===cell.value){
              continue;
          }
          cell.value=this.getNeighbourMineCount(target,row,col);
        }
      }
  }
  dig(target,row0,col0){
      let cell=target[row0].data[col0], counter=cell.value&0x0f;

      //不可挖开的方块
      if(cell.value&0xc0){
        return 0;
      }

      //挖开该方块
      target[row0].data[col0].value |= 0x80;

      //挖到雷
      if(VALUE_MINE===counter){
        return -1;
      }

      return 1;
  }
  mark(target,row,col){
      target[row].data[col].value |= 0x40;
  }
  //自动推理：脏集驱动。
  //初始只检查 seed（本次点击的格子）周围，之后只重查“状态发生过变化的格子”周围的数字格，
  //一次调用跑到不动点，不再依赖外部反复调用。
  //不传 seed 时退化为全盘检查，供没有外部状态的调用方使用。
  autoproc(target,seed){
    let rows=target.length, cols=target[0].data.length;
    let failed=false;
    let dirty=new Set(), pending=[];

    const cellOf=id=>({row:Math.floor(id/cols), col:id%cols});

    //把某个格子及其周围已挖开的数字格加入待检查集合
    const touch=(row,col)=>{
      [{row,col}, ...this.getNeighbours(rows,cols,row,col)].forEach(({row:row1,col:col1})=>{
        let cell=target[row1].data[col1];
        if((0x80&cell.value) && VALUE_MINE!==(cell.value&0x0f)){
          dirty.add(row1*cols+col1);
        }
      });
    };

    //挖开一个格子，挖到0格时记入待展开队列
    const digCell=(row,col)=>{
      let ret=this.dig(target,row,col);
      if(-1===ret){
        failed=true;
        return ret;
      }
      if(0===ret){
        return ret;
      }
      touch(row,col);
      if(0===(target[row].data[col].value&0x0f)){
        pending.push(row*cols+col);
      }
      return ret;
    };

    //标旗后，周围数字格的未知块数发生变化，需要重新检查
    const markCell=(row,col)=>{
      this.mark(target,row,col);
      touch(row,col);
    };

    //展开待处理的0格，0格周围必然无雷，可以连锁挖开
    const flushPending=()=>{
      while(pending.length && !failed){
        let {row,col}=cellOf(pending.pop());
        this.getNeighbours(rows,cols,row,col).forEach(({row:row1,col:col1})=>{
          if(!(0xC0&target[row1].data[col1].value)){
            digCell(row1,col1);
          }
        });
      }
    };

    //检查单个数字格：周围未知块全是雷则标旗，已标旗数正好等于雷数则全部挖开
    const checkCell=(row,col)=>{
      let cell=target[row].data[col], counter=cell.value&0x0f;
      if(VALUE_MINE===counter || !(0x80&cell.value)){
        return;
      }

      let unopened=[], markCount=0;
      this.getNeighbours(rows,cols,row,col).forEach(({row:row1,col:col1})=>{
        let value=target[row1].data[col1].value;
        if(0x40&value){
          markCount++;
        }else if(!(0x80&value)){
          unopened.push({row:row1,col:col1});
        }
      });

      //0格周围没有雷，全部挖开
      if(0===counter){
        unopened.forEach(({row,col})=>digCell(row,col));
        return;
      }

      if(unopened.length && unopened.length===counter-markCount){
        //未知块全是雷
        unopened.forEach(({row,col})=>markCell(row,col));
      }else if(counter===markCount){
        //雷已全部标出，其余未知块一定是安全的
        unopened.forEach(({row,col})=>digCell(row,col));
      }
    };

    //上一轮已经推到不动点，这次只有 seed 周围会发生变化；没有 seed 时只能全盘检查一次
    if(seed){
      touch(seed.row,seed.col);
    }else{
      for(let row=0; row<rows; row++){
        for(let col=0; col<cols; col++){
          let value=target[row].data[col].value;
          if((0x80&value) && VALUE_MINE!==(value&0x0f)){
            dirty.add(row*cols+col);
          }
        }
      }
    }

    while(!failed){
      while(dirty.size && !failed){
        let id=dirty.values().next().value;
        dirty.delete(id);
        let {row,col}=cellOf(id);
        checkCell(row,col);
        flushPending();
      }
      if(failed){
        break;
      }

      //子集规则：某个数字格的未知邻居是另一个数字格未知邻居的子集时，用差集推断确定的雷和安全格
      let {marks, digs}=findCertainActions(target);
      if(!marks.length && !digs.length){
        break;
      }
      marks.forEach(({row,col})=>markCell(row,col));
      digs.forEach(({row,col})=>digCell(row,col));
      flushPending();
    }

    //推理过程中挖到雷，说明盘面上的旗子标错了
    return failed;
  }
  gameFinished(target){
    let rows=target.length, cols=target[0].data.length;
    for(let row=0; row<rows; row++){
      for(let col=0; col<cols; col++){
        let cell=target[row].data[col], counter=cell.value&0x0f;
        if(VALUE_MINE!==counter && !(0x80&cell.value)){
            return false;
        }
      }
    }
    return true;
  }
  handleDig=(data)=>{
    let state=this.state;
    let board=state.board.map(row=>({
        ...row,
        data:row.data.map(cell=>({
            ...cell
        }))
    })), status=state.status;
    //游戏结束了
    if('failed'===status || 'success'===status){
        return;
    }

    //刚开始挖时布雷
    if('initial'===status){
        this.initMines(board,state.mines,data.row,data.col);
        status='running';
    }

    //挖开方块
    let ret = this.dig(board,data.row,data.col);
    if(-1===ret){
        status='failed';
    }

    //自动推理，一次调用跑到不动点
    if('running'===status){
        //推理时挖到雷，说明盘面上的旗子标错了
        if(this.autoproc(board,data)){
            status='failed';
        }
    }

    //当前局面是否完成
    if('running'===status && this.gameFinished(board)){
      //完成时把没标上的地雷标上
      for(let row of board){
        row.data.forEach((cell,col)=>{
          let counter=cell.value&0x0f;
          if(VALUE_MINE===counter){
            row.data[col].value|=0x40;
          }
        });
      }
      status='success';
    }

    //新加一步
    let operation=[ //记录操作
      ...state.operation,
      {
        time:new Date().getTime(),
        col:data.col,
        row:data.row
      }
    ];

    //成功或失败时记录当前局面
    if('failed'===status || 'success'===status){
      writeLog(board,operation,'success'===status);
    }

    this.setState({
      ...state,
      operation,
      status,
      board
    });
  }
  async componentDidMount() {
    //从localStorage获取设置，没获取到就用默认值
    await this.setState({
      width:30,
      height:16,
      mines:99
    });
    try{
      let settingData=localStorage.getItem('react-minesweeper-settings');
      if(settingData){
        settingData=JSON.parse(settingData);
        await this.setState({
          width:Number(settingData.width),
          height:Number(settingData.height),
          mines:Number(settingData.mines)
        });
      }
    }catch(e){
      console.error(e);
    }
    this.startGame();
  }
  openDataAnalysis=()=>{
    window.open('#/dataAnalysis');
  }
  render(){
    let status=this.state.status;
    let statusClass=status, statusMsg='';
    switch(status){
      case 'success':
        statusMsg='Succeed';
      break;
      case 'failed':
        statusMsg='Failed';
      break;
    }
    let remainMines=this.state.mines;
    for(let row of this.state.board){
      for(let cell of row.data){
        if(0x40&cell.value){
          remainMines--;
        }
      }
    }
    return (
      <Translation>{t=>(
        <div className="gamePage">
          <div className="titleBar">
            <div className='btnGroup'>
              <span className='newGame btn-link' onClick={this.startGame}>{t('New Game')}</span>
              <span className='back btn-link' onClick={this.openSetting}>{t('Settings')}</span>
              <span className='newGame btn-link' onClick={this.openDataAnalysis}>{t('Data Analysis')}</span>
            </div>
            <div className='statusGroup'>
              <span className='steps'>{t('Steps')}{this.state.operation.length}</span>
              <span className='remainMines'>{t('Remain')}{remainMines}</span>
            </div>
          </div>
          <div className={['statusLine', statusClass].join(' ')}>{statusMsg ? t(statusMsg) : null}</div>
          <div className='gamePadOuter'>
            <div className='gamePad'>
              {
                this.state.board.map(row=><div className='gamePadRow' key={row.key}>
                  {
                    row.data.map(cell=><Cell data={cell} key={cell.key} onDig={this.handleDig} status={this.state.status}></Cell>)
                  }
                </div>)
              }
            </div>
          </div>
          <SettingDialog ref={this.$refs.settingDialog}></SettingDialog>
        </div>
      )}</Translation>
    );
  }
}
