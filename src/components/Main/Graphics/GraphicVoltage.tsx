import { Select } from 'antd';
import React, { useState } from 'react';
import StatisticCharacter from './StatisticCharacter';
import GraphicProcessed from './GraphicProcessed';
import GraphicInit from './GraphicInit';
import s from './Graphics.module.css';
import { calculationResultInfoType } from '../../../types/types';

const { Option } = Select;

type PropsType = {
  calculationResultInfo: calculationResultInfoType
};

const GraphicVoltage: React.FC<PropsType> = (props) => { 

  const [voltage, setVoltage] = useState(props?.calculationResultInfo.voltageResultProcessed[0])
  const [voltageInit, setVoltageInit] = useState(props?.calculationResultInfo.voltageResults.
    filter(item => item.nodeName == voltage.nodeName))
    
  const handleVoltageChange = (value: string) => {   
    for (let i=0; i<props.calculationResultInfo.voltageResultProcessed.length; i++) {
      if (props.calculationResultInfo.voltageResultProcessed[i].nodeName == value) {
          setVoltage(props.calculationResultInfo.voltageResultProcessed[i]);
        }
      }
      setVoltageInit(props.calculationResultInfo.voltageResults.filter(item => item.nodeName == value));
    };

        return <div >
          <div className="chart">
          <div className="select">
          Узел: 
          <Select defaultValue={props.calculationResultInfo.voltageResultProcessed[0].nodeName} 
            style={{width: 200,}} onChange={handleVoltageChange}>
              {props.calculationResultInfo.voltageResultProcessed?.map((voltageResultProcessed) => (
              <Option value={voltageResultProcessed.nodeName}>{voltageResultProcessed.nodeName}</Option>))}
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