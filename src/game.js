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
            let arr=[];
            for(let col=0;col<width;col++){
                arr.push(0);
            }
            board.push(arr);
        }
        this.setState({
            board
        });
        console.log('board',board,this.state);
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
                        this.state.board.map(row=><div class='gamePadRow'>
                            {
                                row.map(cell=><Cell data={cell}></Cell>)
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
