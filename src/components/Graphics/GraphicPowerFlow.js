//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const GraphicPowerFlow = (props) => { 
        return <div >
          <div className="chart">
            <h4>Предельный переток</h4>
        <BarChart width={500} height={300} data={props.calculationStatistics.calculationResultProcessed} margin={{ top: 5, right: 30, left: 20, bottom: 5,}}>
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
          <li>Максимум: {props.calculationStatistics.maximum}</li>
          <li>Минимум: {props.calculationStatistics.minimum}</li>
          <li>Мат ожидание: {props.calculationStatistics.mean}</li>
          <li>СКО: {props.calculationStatistics.stD}</li>
          </ul>

        </div>
        </div>; 
}
export default GraphicPowerFlow;