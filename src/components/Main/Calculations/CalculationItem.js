import s from './Calculations.module.css';
import { NavLink } from "react-router-dom";

const CalculationItem = (props) => { 
     
        return <div>                
                    <NavLink to={props.calculations.id} className={({ isActive }) => (isActive ? s.active : null)}>{props.calculations.name}</NavLink>
                </div>; 
}
export default CalculationItem;
