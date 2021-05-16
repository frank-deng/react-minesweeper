import './App.css';
import {Component} from 'react';

export default class App extends Component{
  constructor(){
    super();
  }
  render(){
    return (
      <div className="App">
        <h1>Minesweeper</h1>
        <button>初级</button>
        <button>中级</button>
        <button>高级</button>
        <p>本页面使用LocalStorage存储您的游戏记录，包括雷区大小、地雷数、开始时间、结束时间、步数、是否成功。</p>
      </div>
    );
  }
}
