import {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Dialog extends Component{
  container=null;
  constructor(){
    super();
  }
  componentDidUpdate(){
    let visible=this.props.visible;
    //切换body上的容器的新建和销毁
    if(!visible && this.container){
      let body = document.body;
      body.removeChild(this.container);
      this.container=null;
    }else if(visible && !this.container){
      let body = document.body;
      let container = document.createElement("div");
      container.classList.add('dialog-container');
      if(this.props.modalClass){
        container.classList.add(this.props.modalClass);
      }
      this.container=container;
      body.appendChild(container);
    }
    //更新对话框里的内容
    if(!visible){
      return;
    }
    let classList=[
      'dialog-body'
    ];
    if(this.props.customClass){
      classList.push(this.props.customClass);
    }
    ReactDOM.render(
      <div className={classList.join(' ')}>{this.props.children}</div>,
      this.container
    );
  }
  render(){
    return null;
  }
}