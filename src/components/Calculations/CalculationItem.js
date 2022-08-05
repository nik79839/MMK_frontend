import '../Main.css';

const CalculationItem = (props) => { 
        
   const getCalculationStatisticById = () => {
    props.getCalculationStatisticById(props.calculations.calculationId);    
   }
   const deleteCalculationById = () => {
    props.deleteCalculationById(props.calculations.calculationId);    
   }      
        return <div>                
                    <a onClick={getCalculationStatisticById} className="active">{props.calculations.name}</a>
                </div>; 
}
export default CalculationItem;
