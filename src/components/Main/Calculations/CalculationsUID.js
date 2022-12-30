import  CalculationProgress  from './CalculationProgress';
import  CalculationItem  from './CalculationItem';
import { Tabs, List, Button, Input} from 'antd';
import { DeleteOutlined, CloseOutlined  } from '@ant-design/icons';
import s from './Calculations.module.css';
import React, { useState } from 'react';
import {useParams } from 'react-router-dom';

const { Search } = Input;
const { TabPane } = Tabs;

const CalculationsUID = (props) => { 
        
    const calculationReady =[];
    const calculationProcess =[];

    const params = useParams();
    const calculationId = params.id;

    
    for (let i = 0; i<props.calculations?.calculations?.length; i++) {
        if (props.calculations.calculations[i].calculationEnd != null)  {
            calculationReady.push(props.calculations.calculations[i]);
        }
        else{
            calculationProcess.push(props.calculations.calculations[i]);
        }
    }
    var readyTabText = 'Завершенные расчеты (' + calculationReady.length.toString() + ')';

    var inProgressTabText = 'В процессе (' + calculationProcess.length.toString() + ')';

    const deleteCalculationById = (id) => {
        props.deleteCalculationById(id);
       }
       //className={((item.id == calculationId) ? s.calculationsItems : s.activeItemList)}
       const onSearch = (value) => console.log(value);
       const operations = <Search placeholder="Поиск" onSearch={onSearch} enterButton style={{width: '170px'}} />;
       
        return <div className={s.full}>
            <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                <TabPane tab={readyTabText} key="1">
                    <List loading = {props.spin} itemLayout="horizontal" dataSource={calculationReady} renderItem={(item) => (
                        <List.Item className={((item.id == calculationId) ? s.activeItemList : s.calculationsItems)} actions={[<DeleteOutlined style={{color: 'blue'}} onClick={() => deleteCalculationById(item.id)}>Удалить</DeleteOutlined>]}>
                            <List.Item.Meta
                                title={<CalculationItem calculations={item} deleteCalculationById={deleteCalculationById} />}
                                description={item.calculationEnd}
                            />
                            <div className={s.sechName}>КС: {item.sechName}</div>
                        </List.Item>)} 
                    />          
                </TabPane>
            <TabPane tab={inProgressTabText} key="2">
                <List itemLayout="horizontal" dataSource={calculationProcess} renderItem={(item) => (
                        <List.Item className={s.calculationsItems} key={item.title} actions={[<CloseOutlined  style={{color: 'red'}}>Удалить</CloseOutlined >]}>
                            <List.Item.Meta title={<CalculationProgress calculations={item} />}/>
                        </List.Item>)} 
                    /> 
            </TabPane>
            <a>edsg</a>
                </Tabs>           
        </div>; 
}
export default CalculationsUID;
