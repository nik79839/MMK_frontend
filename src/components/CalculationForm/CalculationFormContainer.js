import React, { useEffect } from "react";
import { compose } from "redux";
import { getSeches, getDistricts,startCalculation } from '../../redux/calculationForm-reducer';
import { connect } from 'react-redux';
import  CalculationForm  from './CalculationForm';

const CalculationFormContainer = (props) => { 
    useEffect(  () => {
        props.getSeches();     
    },[])

        return <>   
            <div>
                <CalculationForm seches={props.seches} startCalculation={props.startCalculation} />
            </div>
            </> 
}

let mapStateToProps = (state) => {
    return {
        seches: state.calculationFormPage.seches
    }   
}

export default compose(
    connect(mapStateToProps, {getSeches, getDistricts, startCalculation}))
    (CalculationFormContainer);
