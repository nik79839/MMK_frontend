//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const GraphicVoltage = (props) => { 

  const [voltage, setVoltage] = useState(props?.calculationResultInfo[0])
    
  const handleVoltageChange = (value) => {
    
    for (let i=0; i<props.calculationResultInfo.length; i++) {
      if (props.calculationResultInfo[i].nodeNumber == value) {
          setVoltage(props.calculationResultInfo[i]);
          
        }
      }
    };

        return <div >
          <div className="chart">
          <h4>Напряжение</h4>
          <div className="select">
          Узел: 
          <Select defaultValue={props.calculationResultInfo[0].nodeNumber} style={{width: 200,}} onChange={handleVoltageChange}>
        {props.calculationResultInfo?.map((voltageResultProcessed) => (
          <Option key={voltageResultProcessed.nodeNumber}>{voltageResultProcessed.nodeNumber}</Option>
        ))}
          </Select>
          </div>
        <BarChart width={500} height={300} data={voltage.histogramData} margin={{ top: 5, right: 30, left: 20, bottom: 5,}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="interval" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="height" fill="#8884d8" />
        </BarChart>
        </div>
        <div className="characteristics">
          <ul>
          <li>Максимум: {voltage.maximum}</li>
          <li>Минимум: {voltage.minimum}</li>
          <li>Мат ожидание: {voltage.mean}</li>
          <li>СКО: {props.calculationResultInfo.stD}</li>
          </ul>

        </div>
        </div>; 
}
export default GraphicVoltage;