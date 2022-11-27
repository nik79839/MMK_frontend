import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select } from 'antd';
import React, { useState } from 'react';
import StatisticCharacter from './StatisticCharacter';
import GraphicProcessed from './GraphicProcessed';
import GraphicInit from './GraphicInit';
import s from './Graphics.module.css';

const { Option } = Select;

const GraphicVoltage = (props) => { 

  const [voltage, setVoltage] = useState(props?.calculationResultInfo.processedResult.voltageResultProcessed[0])
  const [voltageInit, setVoltageInit] = useState(props?.calculationResultInfo.initialResult.voltageResults.
    filter(item => item.nodeNumber == voltage.nodeNumber))
    
  const handleVoltageChange = (value) => {   
    for (let i=0; i<props.calculationResultInfo.processedResult.voltageResultProcessed.length; i++) {
      if (props.calculationResultInfo.processedResult.voltageResultProcessed[i].nodeNumber == value) {
          setVoltage(props.calculationResultInfo.processedResult.voltageResultProcessed[i]);
        }
      }
      setVoltageInit(props.calculationResultInfo.initialResult.voltageResults.filter(item => item.nodeNumber == value));
    };

        return <div >
          <div className="chart">
          <div className="select">
          Узел: 
          <Select defaultValue={props.calculationResultInfo.processedResult.voltageResultProcessed[0].nodeName} 
            style={{width: 200,}} onChange={handleVoltageChange}>
              {props.calculationResultInfo.processedResult.voltageResultProcessed?.map((voltageResultProcessed) => (
              <Option key={voltageResultProcessed.nodeNumber}>{voltageResultProcessed.nodeName}</Option>))}
          </Select>
          </div>
          <StatisticCharacter characters = {voltage} measure = "кВ"/>

          <div className={s.graphics}>
                        <div className={s.graphic}>
                            <GraphicProcessed calculationResultInfo={voltage} measure = ' кВ'/> 
                        </div>
                        <div className={s.graphic}>
                            <GraphicInit calculationResultInfo={voltageInit} measure = ' кВ' name = 'Напряжение'/>
                        </div>
                    </div> 
        </div>
        </div>; 
}
export default GraphicVoltage;