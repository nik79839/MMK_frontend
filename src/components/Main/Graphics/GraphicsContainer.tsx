import React from "react";
import { useSelector } from 'react-redux';
import GraphicProcessed from "./GraphicProcessed";
import GraphicInit from "./GraphicInit";
import GraphicVoltage from "./GraphicVoltage";
import { Tabs } from 'antd';
import s from './Graphics.module.css';
import {useParams } from 'react-router-dom';
import StatisticCharacter from "./StatisticCharacter";
import { Divider } from 'antd';
import GraphicCurrent from "./GraphicCurrent";
import { AppStateType } from "../../../redux/redux-store";
const { TabPane } = Tabs;

export const GraphicsContainer: React.FC = () => { 

    const calculations = useSelector((state: AppStateType) => state.mainPage.calculations.calculations);
    const calcResultInfo = useSelector((state: AppStateType) => state.mainPage.calculationResultInfo);
    
    const params = useParams();
    const calculationId = params.id;
    let index = calculations?.findIndex(item => item.id == calculationId);

    let isExistCurrent = false;
    if (calcResultInfo?.currentResultProcessed.length == 0) {
        isExistCurrent = true;
    }

    let isExistVoltage = false;
    if (calcResultInfo?.voltageResultProcessed.length == 0) {
        isExistVoltage = true;
    }

        return  <div className={s.full}>
            <Divider >Результаты расчета "{calculations?.[index]?.name}" </Divider>                  
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Активная мощность" key="1">
                    <StatisticCharacter characters = {calcResultInfo?.powerFlowResultProcessed} measure = 'МВт'/>
                    <div className={s.graphics}>
                        <div className={s.graphic}>
                            <GraphicProcessed calculationResultInfo={calcResultInfo?.powerFlowResultProcessed} measure = ' мВт'/> 
                        </div>
                        <div className={s.graphic}>
                            <GraphicInit calculationResultInfo={calcResultInfo?.powerFlowResults} measure = ' МВт' name = 'Предельный переток'/>
                        </div>
                    </div> 
                </TabPane>
                <TabPane tab="Напряжение" key="2" disabled = {isExistVoltage}>
                    <div>
                        <GraphicVoltage calculationResultInfo={calcResultInfo}/>
                    </div> 
                </TabPane>
                <TabPane tab="Ток" key="3" disabled = {isExistCurrent}>
                    <GraphicCurrent calculationResultInfo={calcResultInfo}/>
                </TabPane>
            </Tabs>
            <div className = {s.parameters}>
                    <div className={s.graphic}>
                    <Divider >Описание расчета</Divider>
                        <label>{calculations[index]?.description}</label>                     
                    </div>
                    <div className={s.graphic}>
                    <Divider >Параметры расчета</Divider>
                            <ul>
                                <li>Количество реализаций: {calcResultInfo?.powerFlowResults.length}</li>
                                <li>Файл режима: {calculations[index]?.pathToRegim}</li>
                                <li>Процент случайного утяжеления: {calculations[index]?.percentForWorsening} %</li>
                                <li>Процент случайного начального состояния: {calculations[index]?.percentLoad} %</li>
                            </ul>                       
                    </div>
                    <div className={s.graphic}>
                        <Divider >Узлы для утяжеления</Divider>
                        {calculations[index]?.worseningSettings.map(a => a.nodeNumber).filter((v, i, a) => a.indexOf(v) === i).join(", ")}                      
                    </div>
                    </div>
            </div>
}
