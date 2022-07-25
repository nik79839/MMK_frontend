import React, { useEffect } from "react";
import { compose } from "redux";
import { getCalculations } from '../redux/main-reducer';
import { connect } from 'react-redux';
import  CalculationsUID  from './CalculationsUID';
import Graphics from "./Graphics";

const GraphicsContainer = (props) => { 

        return (  
            <div>
                <Graphics calculationStatistics={props.calculationStatistic}/>
            </div>  );
}

let mapStateToProps = (state) => {
    return {
        calculationStatistic: state.mainPage.calculationStatistic
    }   
}

export default compose(
    connect(mapStateToProps, {getCalculations}))
    (GraphicsContainer);
