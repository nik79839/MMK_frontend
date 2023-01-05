import  CalculationProgress  from './CalculationProgress';
import  CalculationItem  from './CalculationItem';
import { Tabs, List, Button, Input} from 'antd';
import { DeleteOutlined, CloseOutlined  } from '@ant-design/icons';
import s from './Calculations.module.css';
import React, { useEffect,useState } from 'react';
import {useParams } from 'react-router-dom';
import { calculationType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { Dispatch } from 'redux';
import { getCalculationResultInfoById, getCalculations } from '../../../redux/main-reducer';

const { Search } = Input;
const { TabPane } = Tabs;

export const CalculationsUIDContainer: React.FC = () => { 
        
    const calculationReady: Array<calculationType> =[];
    const calculationProcess: Array<calculationType> =[];

    const params = useParams();
    const calculationId = params.id;

    const [spin, setSpin] = useState(true);
    const calculations = useSelector((state: AppStateType) => state.mainPage.calculations.calculations);
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(getCalculations());
        setSpin(false);
        if (calculationId)
        {
            dispatch(getCalculationResultInfoById(calculationId));
        }     
    },[calculationId])

    
    for (let i = 0; i<calculations?.length; i++) {
        if (calculations[i].calculationEnd != null)  {
            calculationReady.push(calculations[i]);
        }
        else{
            calculationProcess.push(calculations[i]);
        }
    }
    var readyTabText = 'Завершенные расчеты (' + calculationReady.length.toString() + ')';

    var inProgressTabText = 'В процессе (' + calculationProcess.length.toString() + ')';

    const deleteCalculationById = (id: string) => {
        dispatch(deleteCalculationById(id));
       }
       const onSearch = (value: string) => console.log(value);
       const operations = <Search placeholder="Поиск" onSearch={onSearch} enterButton style={{width: '170px'}} />;
       
        return <div className={s.full}>
            <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                <TabPane tab={readyTabText} key="1">
                    <List loading = {spin} itemLayout="horizontal" dataSource={calculationReady} renderItem={(item) => (
                        <List.Item className={((item.id == calculationId) ? s.activeItemList : s.calculationsItems)} 
                            actions={[<DeleteOutlined style={{color: 'blue'}} onClick={() => deleteCalculationById(item.id)}>Удалить</DeleteOutlined>]}>
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
