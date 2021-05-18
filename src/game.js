import {Component} from 'react';

export default class GamePage extends Component{
    constructor(){
        super();
        this.state={
          width:null,
          height:null,
          mines:null
        }
    }
    componentDidMount() {
        let [width,height,mines]=this.props.match.params.param.split(',');
        this.setState({
            width,
            height,
            mines
        })
    }
    render(){
        return (
            <div className="GamePage">
                游戏页面
                {this.state.width}$
                {this.state.height}$
                {this.state.mines}
            </div>
        );
    }
}
