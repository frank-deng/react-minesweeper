import {Component} from 'react';
import Cell from './cell';
import {writeLog} from './logManager';

export const VALUE_MINE=9;
export default class GamePage extends Component{
    constructor(){
        super();
        this.state={
          width:null,
          height:null,
          mines:null,
          board:[],
          operation:[],
          status:'initial'
        };
    }
    goBack=()=>{
        window.location.href=window.location.pathname+`#/`;
    }
    startGame=()=>{
        let board=[],width=this.state.width,height=this.state.height;
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
    autoproc(target){
      let rows=target.length, cols=target[0].data.length;
      let further=false;

      //找到空方块，然后挖开周围方块；找到周边未挖开块数等于当前块雷数的块，然后把周围块标上
      for(let row=0; row<rows; row++){
        for(let col=0; col<cols; col++){
          let cell=target[row].data[col], counter=cell.value&0x0f;
          if(VALUE_MINE===counter || !(0xC0 & cell.value)){
            continue;
          }
          let neighbours=this.getNeighbours(rows,cols,row,col).filter(({row,col})=>{
              let cell=target[row].data[col];
              return !(0x80&cell.value);
          });
          if(0===counter){
            neighbours.forEach(({row,col})=>{
                if(this.dig(target,row,col)){
                    further=true;
                }
            });
          }else if(neighbours.length === counter){
            neighbours.forEach(({row,col})=>{
                this.mark(target,row,col);
            });
          }
        }
      }

      //找到周边被标记块数等于当前块雷数的块，然后把周围未标记且未挖开的块挖开
      for(let row=0; row<rows; row++){
        for(let col=0; col<cols; col++){
          let cell=target[row].data[col], counter=cell.value&0x0f;
          if(VALUE_MINE===counter || !(0xC0 & cell.value) || 0===counter){
            continue;
          }

          //当前块周围被标记的块的个数
          let neighbours=this.getNeighbours(rows,cols,row,col), markCount=0;
          neighbours.forEach(({row,col})=>{
            let cell=target[row].data[col];
            if(0x40&cell.value){
              markCount++;
            }
          });

          //当前块周围被标记的块的个数不等于当前块的雷数
          if(counter!==markCount){
            continue;
          }

          //当前块周围未挖开且未标记的块挖开
          neighbours.forEach(({row,col})=>{
            let cell=target[row].data[col];
            if(!(0xC0&cell.value)){
              further=true;
              this.dig(target,row,col);
            }
          });

          //挖到雷了
          if('failed'===this.status){
            return false;
          }
        }
      }

      return further;
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

      //处理更多雷
      while('running'===status && this.autoproc(board)){}

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
    componentWillMount(){
        let [width,height,mines]=this.props.match.params.param.split(',');
        this.setState({
            width,
            height,
            mines
        });
    }
    componentDidMount() {
        this.startGame();
    }
    render(){
        let status=this.state.status;
        let remainMines=this.state.mines;
        for(let row of this.state.board){
          for(let cell of row.data){
            if(0x40&cell.value){
              remainMines--;
            }
          }
        }
        return (
            <div className="gamePage">
                <div className="titleBar">
                  <span className='back' onClick={this.goBack}>返回</span>
                  <span className='newGame' onClick={this.startGame}>新游戏</span>
                  <span className='steps'>步数：{this.state.operation.length}</span>
                  <span className='remainMines'>剩余雷数：{remainMines}</span>
                  {
                      'success'===status
                      ? <span className='statusLine success'>成功了</span>
                      : 'failed'===status
                      ? <span className='statusLine failed'>失败了</span>
                      : <span className='statusLine'></span>
                  }
                </div>
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
            </div>
        );
    }
}
