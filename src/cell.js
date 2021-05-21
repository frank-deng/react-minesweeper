import {Component} from 'react';

const VALUE_MINE=9;
export default class GamePage extends Component{
    constructor(){
        super();
    }
    handleClick=()=>{
        this.props.onDig(this.props.data);
    }
    render(){
        let data=this.props.data, value=data.value&0x0f;
        let digged=data.value&0x80, marked=data.value&0x40;
        let valueDisplay='';
        if(marked){
            valueDisplay='旗';
        }else if(digged){
            switch(value){
                case VALUE_MINE:
                    valueDisplay='雷';
                break;
                case 0:
                    valueDisplay='';
                break;
                default:
                    valueDisplay=value;
                break;
            }
        }else if('failed'==this.props.status && VALUE_MINE==value){
            valueDisplay='雷';
        }
        return (
            <div className={['cell', digged ? 'digged' : ''].join(' ')} onClick={this.handleClick}>
                {valueDisplay}
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
                        .cell.digged{
                            background:#ffffff;
                        }
                    `}
                </style>
            </div>
        );
    }
}
