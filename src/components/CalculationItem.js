import { NavLink } from 'react-router-dom'
import './Main.css';

const CalculationItem = (props) => { 
        
   const getCalculationResultById = () => {
    props.getCalculationResultById(props.calculations.calculationId);
   }     
        return <div>                
                    <a onClick={getCalculationResultById} className="active">{props.calculations.name}</a>
                </div>; 
}
export default CalculationItem;
