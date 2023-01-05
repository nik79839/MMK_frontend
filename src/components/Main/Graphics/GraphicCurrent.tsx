import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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

const GraphicCurrent: React.FC<PropsType> = (props) => { 

  const [current, setCurrent] = useState(props?.calculationResultInfo.currentResultProcessed[0])
  const [currentInit, setCurrentInit] = useState(props?.calculationResultInfo.currentResults.
    filter(item => item.brunchName == current.brunchName))
    
  const handleVoltageChange = (value: string) => {   
    for (let i=0; i<props?.calculationResultInfo.currentResultProcessed.length; i++) {
      if (props?.calculationResultInfo.currentResultProcessed[i].brunchName == value) {
        setCurrent(props?.calculationResultInfo.currentResultProcessed[i]);
        }
      }
      setCurrentInit(props?.calculationResultInfo.currentResults.filter(item => item.brunchName == value));
    };

        return <div >
          <div className="chart">
          <div className="select">
          Узел: 
          <Select defaultValue={props?.calculationResultInfo?.currentResultProcessed[0]?.brunchName} 
            style={{width: 200,}} onChange={handleVoltageChange}>
              {props.calculationResultInfo.currentResultProcessed?.map((currentResultProcessed) => (
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