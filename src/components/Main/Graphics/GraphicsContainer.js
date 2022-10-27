import React, { useEffect } from "react";
import { compose } from "redux";
import { getCalculations } from '../../../redux/main-reducer';
import { connect } from 'react-redux';
import GraphicPowerFlow from "./GraphicPowerFlow";
import GraphicVoltage from "./GraphicVoltage";
import { Tabs } from 'antd';
import s from './Graphics.module.css';

const { TabPane } = Tabs;

const GraphicsContainer = (props) => { 

        return  <div className="graphics">       
            <Tabs defaultActiveKey="1">
                <TabPane tab="Активная мощность" key="1">
                    <div className={s.graphics}>
                        <div className={s.graphic}>
                            <GraphicPowerFlow calculationResultInfo={props.calculationResultInfo.processedResult.powerFlowResultProcessed}/>
                        </div>
                        <div className={s.characteristics}>
                            <ul>
                                <li>Максимум: {props.calculationResultInfo?.processedResult.powerFlowResultProcessed.maximum}</li>
                                <li>Минимум: {props.calculationResultInfo?.processedResult.powerFlowResultProcessed.minimum}</li>
                                <li>Мат ожидание: {props.calculationResultInfo?.processedResult.powerFlowResultProcessed.mean}</li>
                                <li>СКО: {props.calculationResultInfo?.processedResult.powerFlowResultProcessed.stD}</li>
                                </ul>
                        </div>
                        <div className={s.characteristics}>Test</div>
                    </div> 
                </TabPane>
                <TabPane tab="Напряжение" key="2">
                    <div>
                        <GraphicVoltage calculationResultInfo={props.calculationResultInfo.processedResult.voltageResultProcessed}/>
                    </div> 
                </TabPane>
            </Tabs>
            </div>
}

let mapStateToProps = (state) => {
    return {
        calculationResultInfo: state.mainPage.calculationResultInfo
    }   
}

export default compose(
    connect(mapStateToProps, {getCalculations}))
    (GraphicsContainer);
