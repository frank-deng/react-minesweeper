import {Component} from 'react';

export default class MainPage extends Component{
  constructor(){
    super();
    this.state={
      width:30,
      height:16,
      mines:99
    }
  }
  handleInputChange=(e)=>{
    const target = e.target;
    let value=Number(target.value);
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
  }
  startGame=()=>{
    window.location.href=window.location.pathname+`#/game/${this.state.width},${this.state.height},${this.state.mines}`;
  }
  render(){
    return (
      <div className="App">
        <h1>Minesweeper</h1>
        <button onClick={e=>this.setLevel('beginner')}>初级</button>
        <button onClick={e=>this.setLevel('medium')}>中级</button>
        <button onClick={e=>this.setLevel('expert')}>高级</button>
        宽度<input name='width' value={this.state.width} onInput={this.handleInputChange}/>
        高度<input name='height' value={this.state.height} onInput={this.handleInputChange}/>
        雷数<input name='mines' value={this.state.mines} onInput={this.handleInputChange}/>
        <p>本页面使用LocalStorage存储您的游戏记录，包括雷区大小、地雷数、开始时间、结束时间、步数、是否成功。</p>
        <button onClick={this.startGame}>开始游戏</button>
      </div>
    );
  }
}
