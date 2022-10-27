//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const GraphicPowerFlow = (props) => { 
        return <div >
          <div className="chart">
        <BarChart width={600} height={400} data={props.calculationResultInfo.histogramData} margin={{ top: 5, right: 30, left: 20, bottom: 5,}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="interval" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="height" fill="#8884d8" />
        </BarChart>
        </div>
        </div>; 
}
export default GraphicPowerFlow;