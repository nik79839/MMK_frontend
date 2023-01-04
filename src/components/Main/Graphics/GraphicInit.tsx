import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { calculationResultBaseType } from '../../../types/types';

type PropsType = {
  calculationResultInfo: Array<calculationResultBaseType>
  measure: string
  name: string
};

const GraphicInit: React.FC<PropsType> = (props) => { 
        return <div >
          <div className="chart">
        <LineChart width={560} height={300} data={props.calculationResultInfo} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="implementationId" />
        <YAxis unit={props.measure} />
        <Tooltip />
        <Legend />
        <Line type="momotone" dataKey="value" name={props.name} stroke="#8884d8" dot={false} strokeWidth={3}/>
        </LineChart>
        </div>
        </div>; 
}
export default GraphicInit;