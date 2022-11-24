//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';


const GraphicPowerFlow = (props) => { 
        return <div >
          <div className="chart">
        <BarChart width={550} height={400} data={props.calculationResultInfo.histogramData} margin={{ top: 5, right: 30, left: 20, bottom: 5,}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="interval" unit=" МВт">
          </XAxis>
          <YAxis unit=" %">
            <Label value={"Вероятность"} position="left" angle={-90} style={{ textAnchor: "middle" }}/>
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="height" name = "Вероятность вхождения в диапазон" fill="#8884d8" />
        </BarChart>
        </div>
        </div>; 
}
export default GraphicPowerFlow;