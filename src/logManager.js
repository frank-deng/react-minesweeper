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

    let storageData=[];
    try{
        let storageDataRaw=localStorage.getItem('react-minesweeper-log');
        if(storageDataRaw){
            storageData=JSON.parse(storageDataRaw);
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
export function readLog(){
    let storageData=[];
    try{
        let storageDataRaw=localStorage.getItem('react-minesweeper-log');
        if(storageDataRaw){
            storageData=JSON.parse(storageDataRaw);
        }
    }catch(e){
        console.error(e);
    }
    return storageData;
}
