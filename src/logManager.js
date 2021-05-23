import {VALUE_MINE} from './game.js';
export function writeLog(board,operation,success=false){
    let width=board[0].data.length, height=board.length, mines=[];
    for(let row=0; row<height; row++){
        for(let col=0; col<width; col++){
            let value=board[row].data[col].value;
            if(VALUE_MINE===(value&0x0f)){
                mines.push({col,row});
            }
        }
    }
    console.log('成功或失败时记录当前局面')
    
    let storageData=[];
    try{
        storageData=localStorage.getItem('react-minesweeper-log');
        if(storageData){
            storageData=JSON.parse(storageData);
        }
    }catch(e){
        console.error(e);
    }
    if(!Array.isArray(storageData)){
        storageData=[];
    }
    storageData.push({
        width,
        height,
        success,
        mines,
        operation
    });
    localStorage.setItem('react-minesweeper-log',JSON.stringify(storageData));
}
