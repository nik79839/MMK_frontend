import React, { useEffect } from "react";
import { compose } from "redux";
import { getCalculations, getCalculationResultInfoById, deleteCalculationById } from '../../../redux/main-reducer';
import { connect } from 'react-redux';
import  CalculationsUID  from './CalculationsUID';
import { Spin } from 'antd';
import {useParams } from 'react-router-dom';
import CalculationsUIDNew from "./CalculationsUIDNew";

const CalculationsUIDContainer = (props) => { 
    
    const params = useParams();
    const calculationId = params.id;
    
    useEffect(() => {
        props.getCalculations();
        if (calculationId)
        {
            props.getCalculationStatisticById(calculationId);
        }     
    },[calculationId])

        return <>   
            <div>
                <CalculationsUID calculations={props.calculations} deleteCalculationById={props.deleteCalculationById}/>
            </div>
            {(props.calculations[0]?.id == 'iyk') && (<Spin />)}
            </> 
}

let mapStateToProps = (state) => {
    return {
        calculations: state.mainPage.calculations
    }   
}

export default compose(
    connect(mapStateToProps, {getCalculations, getCalculationStatisticById: getCalculationResultInfoById, deleteCalculationById}))
    (CalculationsUIDContainer);
