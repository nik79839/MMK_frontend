import React, { useEffect } from "react";
import { compose } from "redux";
import { getCalculations } from '../../redux/main-reducer';
import { connect } from 'react-redux';
import  CalculationsUID  from '../Calculations/CalculationsUID';
import GraphicPowerFlow from "./GraphicPowerFlow";
import GraphicVoltage from "./GraphicVoltage";

const GraphicsContainer = (props) => { 

        return  <div className="graphics">       
            <div>
                <GraphicPowerFlow calculationStatistics={props.calculationStatistic.powerFlowResultProcessed}/>
            </div> 
            <div>
                <GraphicVoltage calculationStatistics={props.calculationStatistic.voltageResultProcessed}/>
            </div>  
            </div>
}

let mapStateToProps = (state) => {
    return {
        calculationStatistic: state.mainPage.calculationStatistic
    }   
}

export default compose(
    connect(mapStateToProps, {getCalculations}))
    (GraphicsContainer);
