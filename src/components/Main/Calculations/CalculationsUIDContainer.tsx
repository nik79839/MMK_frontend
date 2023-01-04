import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { getCalculations, getCalculationResultInfoById, deleteCalculationById } from '../../../redux/main-reducer';
import { connect } from 'react-redux';
import  CalculationsUID  from './CalculationsUID';
import {useParams } from 'react-router-dom';
import { calculationType } from "../../../types/types";
import { AppStateType } from "../../../redux/redux-store";

type MapStatePropsType = {
    calculations: Array<calculationType>
}
type MapDispatchpropsType = {
    deleteCalculationById: (id: string) => void
    getCalculations: () => void
    getCalculationResultInfoById: (id: string) => void
}

type PropsType = MapStatePropsType & MapDispatchpropsType;

const CalculationsUIDContainer: React.FC<PropsType> = (props) => { 
    
    const params = useParams();
    const calculationId: string = params.id;
    const [spin, setSpin] = useState<boolean>(true);
    
    useEffect(() => {
        props.getCalculations();
        setSpin(false);
        if (calculationId)
        {
            props.getCalculationResultInfoById(calculationId);
        }     
    },[calculationId])

        return <>   
            <div>
                <CalculationsUID calculations={props.calculations} deleteCalculationById={props.deleteCalculationById} spin = {spin}/>
            </div>
            </> 
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        calculations: state.mainPage.calculations.calculations
    }   
}

export default compose(
    connect<MapStatePropsType, MapDispatchpropsType, AppStateType>(mapStateToProps, {getCalculations, getCalculationResultInfoById, deleteCalculationById}))
    (CalculationsUIDContainer);
