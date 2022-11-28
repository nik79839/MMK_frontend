import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select } from 'antd';
import React, { useState } from 'react';
import StatisticCharacter from './StatisticCharacter';
import GraphicProcessed from './GraphicProcessed';
import GraphicInit from './GraphicInit';
import s from './Graphics.module.css';

const { Option } = Select;

const GraphicCurrent = (props) => { 

  const [current, setCurrent] = useState(props?.calculationResultInfo.processedResult.currentResultProcessed[0])
  const [currentInit, setCurrentInit] = useState(props?.calculationResultInfo.initialResult.currentResults.
    filter(item => item.brunchName == current.brunchName))
    
  const handleVoltageChange = (value) => {   
    for (let i=0; i<props?.calculationResultInfo.processedResult.currentResultProcessed.length; i++) {
      if (props?.calculationResultInfo.processedResult.currentResultProcessed[i].brunchName == value) {
        setCurrent(props?.calculationResultInfo.processedResult.currentResultProcessed[i]);
        }
      }
      setCurrentInit(props?.calculationResultInfo.initialResult.currentResults.filter(item => item.brunchName == value));
    };

        return <div >
          <div className="chart">
          <div className="select">
          Узел: 
          <Select defaultValue={props?.calculationResultInfo?.processedResult.currentResultProcessed[0]?.brunchName} 
            style={{width: 200,}} onChange={handleVoltageChange}>
              {props.calculationResultInfo.processedResult.currentResultProcessed?.map((currentResultProcessed) => (
              <Option key={currentResultProcessed.brunchName}>{currentResultProcessed.brunchName}</Option>))}
          </Select>
          </div>
          <StatisticCharacter characters = {current} measure = "кА"/>

          <div className={s.graphics}>
                        <div className={s.graphic}>
                            <GraphicProcessed calculationResultInfo={current} measure = ' кА'/> 
                        </div>
                        <div className={s.graphic}>
                            <GraphicInit calculationResultInfo={currentInit} measure = ' кА' name = 'Ток'/>
                        </div>
                    </div> 
        </div>
        </div>; 
}
export default GraphicCurrent;