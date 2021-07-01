import {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Dialog extends Component{
  //Modal容器对应的DOM
  container=null;
  componentDidUpdate(){
    let visible=this.props.visible;
    //切换body上的容器的新建和销毁
    if(!visible && this.container){
      document.body.removeChild(this.container);
      this.container=null;
    }else if(visible && !this.container){
      let container = document.createElement("div");
      container.classList.add('dialog-container');
      if(this.props.modalClass){
        container.classList.add(this.props.modalClass);
      }
      this.container=container;
      document.body.appendChild(container);
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
  componentWillUnmount(){
    //Modal被销毁时，将对应的DOM手动清除
    if(this.container){
      document.body.removeChild(this.container);
      this.container=null;
    }
  }
  //不使用组件默认的render()函数，因为该组件对应的DOM不在父组件对应的DOM下面，而在body上
  render(){
    return null;
  }
}