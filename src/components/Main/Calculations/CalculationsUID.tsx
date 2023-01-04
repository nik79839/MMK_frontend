import  CalculationProgress  from './CalculationProgress';
import  CalculationItem  from './CalculationItem';
import { Tabs, List, Button, Input} from 'antd';
import { DeleteOutlined, CloseOutlined  } from '@ant-design/icons';
import s from './Calculations.module.css';
import React, { useState } from 'react';
import {useParams } from 'react-router-dom';
import { calculationType } from '../../../types/types';

const { Search } = Input;
const { TabPane } = Tabs;

type PropsType = {
    calculations: Array<calculationType>
    deleteCalculationById: (id: string) => void
    spin: boolean
};

const CalculationsUID: React.FC<PropsType> = (props) => { 
        
    const calculationReady: Array<calculationType> =[];
    const calculationProcess: Array<calculationType> =[];

    const params = useParams();
    const calculationId = params.id;

    
    for (let i = 0; i<props.calculations?.length; i++) {
        if (props.calculations[i].calculationEnd != null)  {
            calculationReady.push(props.calculations[i]);
        }
        else{
            calculationProcess.push(props.calculations[i]);
        }
    }
    var readyTabText = 'Завершенные расчеты (' + calculationReady.length.toString() + ')';

    var inProgressTabText = 'В процессе (' + calculationProcess.length.toString() + ')';

    const deleteCalculationById = (id: string) => {
        props.deleteCalculationById(id);
       }
       const onSearch = (value: string) => console.log(value);
       const operations = <Search placeholder="Поиск" onSearch={onSearch} enterButton style={{width: '170px'}} />;
       
        return <div className={s.full}>
            <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                <TabPane tab={readyTabText} key="1">
                    <List loading = {props.spin} itemLayout="horizontal" dataSource={calculationReady} renderItem={(item) => (
                        <List.Item className={((item.id == calculationId) ? s.activeItemList : s.calculationsItems)} actions={[<DeleteOutlined style={{color: 'blue'}} onClick={() => deleteCalculationById(item.id)}>Удалить</DeleteOutlined>]}>
                            <List.Item.Meta
                                title={<CalculationItem calculations={item} />}
                                description={item.calculationEnd}
                            />
                            <div className={s.sechName}>КС: {item.sechName}</div>
                        </List.Item>)} 
                    />          
                </TabPane>
            <TabPane tab={inProgressTabText} key="2">
                <List itemLayout="horizontal" dataSource={calculationProcess} renderItem={(item) => (
                        <List.Item className={s.calculationsItems} actions={[<CloseOutlined  style={{color: 'red'}}>Удалить</CloseOutlined >]}>
                            <List.Item.Meta title={<CalculationProgress calculations={item} />}/>
                        </List.Item>)} 
                    /> 
            </TabPane>
            <a>edsg</a>
                </Tabs>           
        </div>; 
}
export default CalculationsUID;
