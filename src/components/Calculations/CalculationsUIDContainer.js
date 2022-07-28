import React, { useEffect } from "react";
import { compose } from "redux";
import { getCalculations, getCalculationStatisticById } from '../../redux/main-reducer';
import { connect } from 'react-redux';
import  CalculationsUID  from './CalculationsUID';
import { Spin } from 'antd';

const CalculationsUIDContainer = (props) => { 
    useEffect(  () => {
        props.getCalculations();     
    },[])

        return <>   
            <div>
                <CalculationsUID calculations={props.calculations} getCalculationStatisticById={props.getCalculationStatisticById}/>
            </div>
            {(props.calculations[0].calculationId == 'iyk') && (<Spin />)}
            </> 
}

let mapStateToProps = (state) => {
    return {
        calculations: state.mainPage.calculations
    }   
}

export default compose(
    connect(mapStateToProps, {getCalculations, getCalculationStatisticById}))
    (CalculationsUIDContainer);
