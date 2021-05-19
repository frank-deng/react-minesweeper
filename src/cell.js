import {Component} from 'react';

export default class GamePage extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className="cell">
                <style>
                    {`
                        .cell{
                            display:inline-block;
                            vertical-align:top;
                            width:32px;
                            height:32px;
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
