import {Component} from 'react';

export default class GamePage extends Component{
    constructor(){
        super();
    }
    handleClick=()=>{
        this.props.onDig(this.props.data);
    }
    render(){
        let data=this.props.data;
        let digged=data.value&0x80;
        return (
            <div className="cell" onClick={this.handleClick}>
                {
                    digged ? data.value : null
                }
                <style>
                    {`
                        .cell{
                            user-select:none;
                            display:inline-block;
                            vertical-align:top;
                            width:32px;
                            height:32px;
                            line-height:32px;
                            text-align:center;
                            border:1px solid #cccccc;
                            background:#aaaaaa;
                            border-radius:1px;
                            cursor:pointer;
                        }
                    `}
                </style>
            </div>
        );
    }
}
