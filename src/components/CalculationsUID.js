import { NavLink } from 'react-router-dom'
import  CalculationItem  from './CalculationItem';

import './Main.css';

const CalculationsUID = (props) => { 
        
    const getCalculationResultById = (id) => {
        props.getCalculationResultById(id);
       } 

        return <div>
            <h2>Список расчетов</h2>
            <div className="calculationsItems">
                {
                    props.calculations?.map((calculations) => (
                        <CalculationItem calculations={calculations} getCalculationResultById={getCalculationResultById} />
                    ))
                }              
            </div>
        </div>; 
}
export default CalculationsUID;
