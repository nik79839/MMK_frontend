import React from "react";
import { compose } from "redux";
import { getCalculations } from '../../../redux/main-reducer';
import { connect } from 'react-redux';
import GraphicProcessed from "./GraphicProcessed";
import GraphicInit from "./GraphicInit";
import GraphicVoltage from "./GraphicVoltage";
import { Tabs } from 'antd';
import s from './Graphics.module.css';
import {useParams } from 'react-router-dom';
import StatisticCharacter from "./StatisticCharacter";
import { Collapse, Tooltip, Col, Row } from 'antd';
const { Panel } = Collapse;

const { TabPane } = Tabs;

const GraphicsContainer = (props) => { 

    const params = useParams();
    const calculationId = params.id;
    let index = props.calculations?.calculations.findIndex(item => item.id == calculationId);

    let isExistCurrent = false;
    if (props?.calculationResultInfo?.processedResult?.currentResultProcessed.length == 0) {
        isExistCurrent = true;
    }

    let isExistVoltage = false;
    if (props?.calculationResultInfo?.processedResult?.voltageResultProcessed.length == 0) {
        isExistVoltage = true;
    }



        return  <div className="graphics">
            <Tooltip title="prompt text" placement="bottom">
                <h5>Результаты расчета "{props.calculations?.calculations[index]?.name}" </h5>
            </Tooltip>
                   
            <Tabs defaultActiveKey="1">
                <TabPane tab="Активная мощность" key="1">
                    <StatisticCharacter characters = {props.calculationResultInfo?.processedResult.powerFlowResultProcessed} measure = 'МВт'/>
                    <div className={s.graphics}>
                        <div className={s.graphic}>
                            <GraphicProcessed calculationResultInfo={props.calculationResultInfo.processedResult.powerFlowResultProcessed}
                                measure = ' мВт'/> 
                        </div>
                        <div className={s.graphic}>
                            <GraphicInit calculationResultInfo={props.calculationResultInfo.initialResult.powerFlowResults} 
                                measure = ' МВт' name = 'Предельный переток'/>
                        </div>
                    </div> 
                </TabPane>
                <TabPane tab="Напряжение" key="2" disabled = {isExistVoltage}>
                    <div>
                        <GraphicVoltage calculationResultInfo={props.calculationResultInfo}/>
                    </div> 
                </TabPane>
                <TabPane tab="Ток" key="3" disabled = {isExistCurrent}>

                </TabPane>
            </Tabs>
            <div className = {s.parameters}>
                    <div className={s.graphic}>
                        <h6>Описание расчета</h6>
                        <label>{props.calculations?.calculations[index]?.description}</label>                     
                    </div>
                    <div className={s.graphic}>
                            <h6>Параметры расчета</h6>
                            <ul>
                                <li>Количество реализаций: {props.calculationResultInfo?.initialResult.powerFlowResults.length}</li>
                                <li>Файл режима: {props.calculations?.calculations[index].pathToRegim}</li>
                                <li>Процент случайного утяжеления: {props.calculations?.calculations[index].percentForWorsening} %</li>
                                <li>Процент случайного начального состояния: {props.calculations?.calculations[index].percentLoad} %</li>
                            </ul>                       
                    </div>
                    <div className={s.graphic}>
                        <h6>Узлы для утяжеления</h6>                      
                    </div>
                    </div>
            </div>
}

let mapStateToProps = (state) => {
    return {
        calculationResultInfo: state.mainPage.calculationResultInfo,
        calculations: state.mainPage.calculations
    }   
}

export default compose(
    connect(mapStateToProps, {getCalculations}))
    (GraphicsContainer);
