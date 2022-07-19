

const Graphics = (props) => { 
        return <div >
            {
                    props.calculationResults?.map((calculationResults) => (
                        <h5>{calculationResults.powerFlowLimit}</h5>
                    ))
                }
        </div>; 
}
export default Graphics;