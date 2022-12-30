import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { getCalculations, getCalculationResultInfoById, deleteCalculationById } from '../../../redux/main-reducer';
import { connect } from 'react-redux';
import  CalculationsUID  from './CalculationsUID';
import { Spin, Divider } from 'antd';
import {useParams } from 'react-router-dom';
import CalculationsUIDNew from "./CalculationsUIDNew";

const CalculationsUIDContainer = (props) => { 
    
    const params = useParams();
    const calculationId = params.id;
    const [spin, setSpin] = useState(true);
    
    useEffect(() => {
        props.getCalculations();
        setSpin(false);
        if (calculationId)
        {
            props.getCalculationStatisticById(calculationId);
        }     
    },[calculationId])

        return <>   
            <div>
                <CalculationsUID calculations={props.calculations} deleteCalculationById={props.deleteCalculationById} spin = {spin}/>
            </div>
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
