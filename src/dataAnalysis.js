import {Component} from 'react';
import { Translation } from 'react-i18next';
import {readLog} from './logManager';
import {saveAs} from 'file-saver';
import './dataAnalysis.scss';
import dbf from 'dbf';
export default class DataAnalysis extends Component{
    state={
        dataRaw:null,
        dataList:[]
    };
    componentWillMount(){
        let dataRaw = readLog();
        let listLow = dataRaw.filter(item=>(10===item.width && 10===item.height && 10===item.mines.length));
        let listMid = dataRaw.filter(item=>(16===item.width && 16===item.height && 40===item.mines.length));
        let listHigh = dataRaw.filter(item=>(
            ((30===item.width && 16===item.height) || (16===item.width && 30===item.height))
            && 99===item.mines.length));
        this.setState({
            dataRaw,
            dataList:[
                {
                    label:'Beginner',
                    ...this.getStatResult(listLow)
                },
                {
                    label:'Middle',
                    ...this.getStatResult(listMid)
                },
                {
                    label:'Expert',
                    ...this.getStatResult(listHigh)
                }
            ]
        });
    }
    getStatResult(data){
        let success_times=0, one_click_finish=0, total_steps=0, time_total=0;
        for(let item of data){
            if(item.success){
                success_times++;
            }
            if(1===item.operation.length){
                one_click_finish++;
            }
            total_steps+=item.operation.length;
            let time=item.operation[item.operation.length-1].time-item.operation[0].time;
            time_total+=time;
        }
        return{
            success_rate: data.length ? success_times/data.length : 0,
            one_click_finish,
            average_steps: data.length ? total_steps/data.length : 0,
            average_time: data.length ? time_total/data.length : 0,
        }
    }
    exportJSON=()=>{
        saveAs(new Blob([JSON.stringify(this.state.dataRaw)], {type: "text/plain;charset=utf-8"}),'minesweeper-log.json');
    }
    exportDBF=()=>{
        let dbfData=[];
        for(let item of this.state.dataRaw){
            dbfData.push({
                ID:item.id,
                WIDTH:item.width,
                HEIGHT:item.height,
                MINES:item.mines.length,
                SUCCESS:item.success ? 'Y' : 'N',
                START:item.operation[0].time,
                TIME:((item.operation[item.operation.length-1].time-item.operation[0].time)/1000).toFixed(2)
            });
        }
        saveAs(new Blob([dbf.structure(dbfData).buffer]),'mine.dbf');
    }
    goBack=()=>{
        window.close();
        window.location='#/';
    }
    render(){
        return <Translation>{t=>(
            <div className='dataAnalysis'>
                <div className='toolbox'>
                    <span className='btn-link' onClick={this.goBack}>{t('Close')}</span>
                    <span className='btn-link' onClick={this.exportJSON}>{t('Export JSON')}</span>
                    <span className='btn-link' onClick={this.exportDBF}>{t('Export DBF')}</span>
                </div>
                <table className='mainTable'>
                    <tbody>
                        <tr>
                            <th>{t('Level')}</th>
                            <th>{t('Success Rate')}</th>
                            <th>{t('Average Steps')}</th>
                            <th>{t('Average Time')}</th>
                            <th>{t('One-step Success Times')}</th>
                        </tr>
                        {
                            this.state.dataList.map(item=>{
                                return <tr key={item.label}>
                                    <td>{t(item.label)}</td>
                                    <td>{(item.success_rate*100).toFixed(2)}%</td>
                                    <td>{(item.average_steps).toFixed(2)}</td>
                                    <td>{(item.average_time/1000).toFixed(2)}s</td>
                                    <td>{item.one_click_finish}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )}</Translation>
    }
}