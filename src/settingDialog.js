import {Component} from 'react';
import Dialog from './dialog';

const MIN_WIDTH=4;
const MAX_WIDTH=30;
const MIN_HEIGHT=4;
const MAX_HEIGHT=24;

function limitValue(value,min,max){
  if(value<min){
    return min;
  }else if (value>max){
    return max;
  }
  return value;
}
export default class SettingDialog extends Component{
  state={
    display:false,
    width:30,
    height:16,
    mines:99,
    errorMsg:null
  }
  resolve=null;
  reject=null;
  constructor(){
    super();
  }
  open(param){
    return new Promise((resolve,reject)=>{
      Object.assign(this,{
        resolve,
        reject
      });
      this.setState({
        ...param,
        display:true
      });
    })
  }
  handleInputChange=(e)=>{
    const target = e.target;
    let value=target.value;
    if(/^\d+$/.test(value)){
      value=Number(value);
      switch(target.name){
        case 'width':
          value=limitValue(value,MIN_WIDTH,MAX_WIDTH);
        break;
        case 'height':
          value=limitValue(value,MIN_HEIGHT,MAX_HEIGHT);
        break;
        case 'mines':
          value=limitValue(value,4,MAX_WIDTH*MAX_HEIGHT-1);
        break;
      }
    }
    this.setState({
      [target.name]: value
    });
  }
  setLevel=(level)=>{
    switch(level){
      case 'beginner':
        this.setState({
          width:10,
          height:10,
          mines:10
        });
      break;
      case 'medium':
        this.setState({
          width:16,
          height:16,
          mines:40
        });
      break;
      case 'expert':
        this.setState({
          width:30,
          height:16,
          mines:99
        });
      break;
    }
    this.setState({
      errorMsg:null
    });
  }
  startGame=()=>{
    let {width,height,mines}=this.state;
    let errorList=[];
    if(!/^\d+$/.test(width)){
      errorList.push('宽度值必须为整数');
    }
    if(!/^\d+$/.test(height)){
      errorList.push('高度值必须为整数');
    }
    if(!/^\d+$/.test(mines)){
      errorList.push('雷数必须为整数');
    }
    if(errorList.length){
      this.setState({
        errorMsg:errorList.join('\n')
      });
      return;
    }
    width=Number(width);
    height=Number(height);
    mines=Number(mines);
    let maxMines=width*height-1;
    if(mines>maxMines){
      mines=maxMines;
    }
    
    if(this.resolve){
      this.resolve({
        width,
        height,
        mines
      });
    }
    this.resolve=this.reject=null;
    this.setState({
      width,
      height,
      mines,
      display:false
    });
  }
  cancelSubmit=()=>{
    if(this.reject){
      this.reject('cancel');
    }
    this.resolve=this.reject=null;
    this.setState({
      display:false
    });
  }
  render(){
    let errorMsg=this.state.errorMsg;
    return (
      <Dialog visible={this.state.display} customClass='settingDialog'>
        <div className='levelSelection'>
          <span className='selectLevel' onClick={e=>this.setLevel('beginner')}>初级</span>
          <span className='selectLevel' onClick={e=>this.setLevel('medium')}>中级</span>
          <span className='selectLevel' onClick={e=>this.setLevel('expert')}>高级</span>
        </div>
        <div className='gameSettingForm'>
          <div className='formItem'>
            <span className='itemTitle'>宽度({MIN_WIDTH}-{MAX_WIDTH})</span>
            <input name='width' autoComplete="off" maxLength='2' value={this.state.width} onInput={this.handleInputChange}/>
          </div>
          <div className='formItem'>
            <span className='itemTitle'>高度({MIN_HEIGHT}-{MAX_HEIGHT})</span>
            <input name='height' autoComplete="off" maxLength='2' value={this.state.height} onInput={this.handleInputChange}/>
          </div>
          <div className='formItem'>
            <span className='itemTitle'>雷数(2-{MAX_WIDTH*MAX_HEIGHT-1})</span>
            <input name='mines' autoComplete="off" maxLength='3' value={this.state.mines} onInput={this.handleInputChange}/>
          </div>
        </div>
        {errorMsg && <div className='errorMsg'>{errorMsg}</div>}
        <button className='startGame' onClick={this.startGame}><span>确定</span></button>
        <button className='cancelSetting' onClick={this.cancelSubmit}><span>取消</span></button>
      </Dialog>
    );
  }
}
