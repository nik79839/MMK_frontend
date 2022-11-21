import React from "react";
import { compose } from "redux";
import { getCalculations } from '../../../redux/main-reducer';
import { connect } from 'react-redux';
import GraphicPowerFlow from "./GraphicPowerFlow";
import GraphicVoltage from "./GraphicVoltage";
import { Tabs } from 'antd';
import s from './Graphics.module.css';
import {useParams } from 'react-router-dom';

const { TabPane } = Tabs;

const GraphicsContainer = (props) => { 

    const params = useParams();
    const calculationId = params.id;
    let index = props.calculations?.calculations.findIndex(item => item.id === calculationId);


        return  <div className="graphics">
            <h5>Результаты расчета "{props.calculations?.calculations[index]?.name}" </h5>       
            <Tabs defaultActiveKey="1">
                <TabPane tab="Активная мощность" key="1">
                    <div className={s.graphics}>
                        <div className={s.graphic}>
                            <GraphicPowerFlow calculationResultInfo={props.calculationResultInfo.processedResult.powerFlowResultProcessed}/>
                        </div>
                        <div className={s.characteristics}>
                            <h5>Статистические характеристики</h5>
                            <ul>
                                <li>Максимум: {props.calculationResultInfo?.processedResult.powerFlowResultProcessed.maximum}</li>
                                <li>Минимум: {props.calculationResultInfo?.processedResult.powerFlowResultProcessed.minimum}</li>
                                <li>Мат ожидание: {props.calculationResultInfo?.processedResult.powerFlowResultProcessed.mean}</li>
                                <li>СКО: {props.calculationResultInfo?.processedResult.powerFlowResultProcessed.stD}</li>
                            </ul>
                        </div>
                        <div className={s.characteristics}>
                            <h5>Параметры расчета</h5>
                            <ul>
                                <li>Количество реализаций: {props.calculationResultInfo?.initialResult.powerFlowResults.length}</li>
                                <li>Файл режима: {props.calculations?.calculations[index].pathToRegim}</li>
                                <li>Процент случайного утяжеления: {props.calculations?.calculations[index].percentForWorsening}</li>
                                <li>Процент случайного начального состояния: {props.calculations?.calculations[index].percentLoad}</li>
                            </ul>
                        </div>
                    </div> 
                </TabPane>
                <TabPane tab="Напряжение" key="2">
                    <div>
                        <GraphicVoltage calculationResultInfo={props.calculationResultInfo.processedResult.voltageResultProcessed}/>
                    </div> 
                </TabPane>
                <TabPane tab="Ток" key="2">

                </TabPane>
                <TabPane tab="Табличный вид" key="2">

                </TabPane>
            </Tabs>
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
