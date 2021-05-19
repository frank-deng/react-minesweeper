import {Component} from 'react';
import Cell from './cell';

export default class GamePage extends Component{
    constructor(){
        super();
        this.state={
          width:null,
          height:null,
          mines:null,
          board:[]
        };
    }
    startGame=()=>{
        let board=[],width=this.state.width,height=this.state.height;
        for(let row=0;row<height;row++){
            let array=[];
            for(let col=0;col<width;col++){
                array.push({
                    key:Math.random(),
                    row,
                    col,
                    value:0
                });
            }
            board.push({
                key:Math.random(),
                data:array
            });
        }
        this.setState({
            board
        });
    }
    handleDig=(data)=>{
        this.setState(state=>{
            let board=state.board;
            board[data.row].data[data.col].value |= 0x80;
            return{
                ...state,
                board
            }
        });

    }
    componentWillMount(){
        let [width,height,mines]=this.props.match.params.param.split(',');
        this.setState({
            width,
            height,
            mines
        });
    }
    componentDidMount() {
        this.startGame();
    }
    render(){
        return (
            <div className="GamePage">
                游戏页面
                <div className='gamePad'>
                    {
                        this.state.board.map(row=><div className='gamePadRow' key={row.key}>
                            {
                                row.data.map(cell=><Cell data={cell} key={cell.key} onDig={this.handleDig}></Cell>)
                            }
                        </div>)
                    }
                </div>
                <style>
                    {`
                        .gamePadRow{
                            line-height:1;
                        }
                    `}
                </style>
            </div>
        );
    }
}
