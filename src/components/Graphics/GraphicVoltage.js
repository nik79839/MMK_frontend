//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;



const GraphicVoltage = (props) => { 

    const [voltage, setVoltage] = useState(props.calculationStatistics.voltageResultProcessed[0])
    const handleVoltageChange = (value) => {
      for (let i=0; i<props.calculationStatistics.voltageResultProcessed.length; i++) {
        if (props.calculationStatistics.voltageResultProcessed[i].nodeNumber == value) {
          setVoltage(props.calculationStatistics.voltageResultProcessed[i]);
        }
      }
    };

        return <div >
          <div className="chart">
          <h3>Напряжение</h3>
          <div className="select">
          Узел: 
          <Select defaultValue={props.calculationStatistics.voltageResultProcessed[0].nodeNumber} style={{width: 120,}} 
          onChange={handleVoltageChange}>
        {props.calculationStatistics.voltageResultProcessed?.map((voltageResultProcessed) => (
          <Option key={voltageResultProcessed.nodeNumber}>{voltageResultProcessed.nodeNumber}</Option>
        ))}
          </Select>
          </div>
        <BarChart width={500} height={300} data={voltage.calculationResultProcesseds} margin={{ top: 5, right: 30, left: 20, bottom: 5,}}>
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
          <li>СКО: {props.calculationStatistics.stD}</li>
          </ul>

        </div>
        </div>; 
}
export default GraphicVoltage;