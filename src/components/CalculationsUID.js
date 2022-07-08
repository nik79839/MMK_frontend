
const CalculationsUID = (props) => { 
        
        return <div>
            <h2>Lists</h2>
            <div>
                {
                    props.calculations?.map((calculations,index) => (
                        <h5>{calculations.calculationId}</h5>
                    ))
                }              
            </div>
        </div>; 
}
export default CalculationsUID;
