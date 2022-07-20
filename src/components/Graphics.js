//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Graphics = (props) => { 
        return <div >
        <BarChart width={500} height={300} data={props.calculationResults} margin={{ top: 5, right: 30, left: 20, bottom: 5,}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="interval" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="height" fill="#8884d8" />
        </BarChart>
            {
                    props.calculationResults?.map((calculationResults) => (
                        <h5>{calculationResults.powerFlowLimit}</h5>
                    ))
                }
                
        </div>; 
}
export default Graphics;