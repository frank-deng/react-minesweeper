import {Component} from 'react';

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
export default class MainPage extends Component{
  constructor(){
    super();
    this.state={
      width:30,
      height:16,
      mines:99,
      errorMsg:null
    }
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
    window.location.href=window.location.pathname+`#/game/${width},${height},${mines}`;
  }
  render(){
    let errorMsg=this.state.errorMsg;
    return (
      <div className="mainPage">
        <h1>极速扫雷</h1>
        <div class='levelSelection'>
          <span class='selectLevel' onClick={e=>this.setLevel('beginner')}>初级</span>
          <span class='selectLevel' onClick={e=>this.setLevel('medium')}>中级</span>
          <span class='selectLevel' onClick={e=>this.setLevel('expert')}>高级</span>
        </div>
        <div class='gameSettingForm'>
          <div class='formItem'>
            <span class='itemTitle'>宽度({MIN_WIDTH}-{MAX_WIDTH})</span>
            <input name='width' maxlength='2' value={this.state.width} onInput={this.handleInputChange}/>
          </div>
          <div class='formItem'>
            <span class='itemTitle'>高度({MIN_HEIGHT}-{MAX_HEIGHT})</span>
            <input name='height' maxlength='2' value={this.state.height} onInput={this.handleInputChange}/>
          </div>
          <div class='formItem'>
            <span class='itemTitle'>雷数(2-{MAX_WIDTH*MAX_HEIGHT-1})</span>
            <input name='mines' maxlength='3' value={this.state.mines} onInput={this.handleInputChange}/>
          </div>
        </div>
        {errorMsg && <div className='errorMsg'>{errorMsg}</div>}
        <button class='startGame' onClick={this.startGame}><span>开始游戏</span></button>
      </div>
    );
  }
}
