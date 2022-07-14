import React, { useEffect } from "react";
import { compose } from "redux";
import { getCalculations } from '../redux/main-reducer';
import { connect } from 'react-redux';
import  CalculationsUID  from './CalculationsUID';
import Graphics from "./Graphics";

const GraphicsContainer = (props) => { 

        return (  
            <div>
                <Graphics calculationResults={props.calculationResult}/>
            </div>  );
}

let mapStateToProps = (state) => {
    debugger;
    return {
        calculationResult: state.mainPage.calculationResult
    }   
}

export default compose(
    connect(mapStateToProps, {getCalculations}))
    (GraphicsContainer);
