import { NavLink } from 'react-router-dom'
import './Main.css';
import { Progress } from 'antd';

const CalculationProgress = (props) => { 

        return <div>                
                    <a className="active">{props.calculations.name}</a>
                    <Progress percent={props.calculations.progress} status="active" />
                </div>; 
}
export default CalculationProgress;
