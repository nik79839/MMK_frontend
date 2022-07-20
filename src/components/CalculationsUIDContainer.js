import React, { useEffect } from "react";
import { compose } from "redux";
import { getCalculations, getCalculationResultById } from '../redux/main-reducer';
import { connect } from 'react-redux';
import  CalculationsUID  from './CalculationsUID';

const CalculationsUIDContainer = (props) => { 
    useEffect(  () => {
        props.getCalculations();     
    },[])

        return (  
            <div>
                <CalculationsUID calculations={props.calculations} getCalculationResultById={props.getCalculationResultById}/>
            </div>  );
}

let mapStateToProps = (state) => {
    return {
        calculations: state.mainPage.calculations
    }   
}

export default compose(
    connect(mapStateToProps, {getCalculations, getCalculationResultById}))
    (CalculationsUIDContainer);
