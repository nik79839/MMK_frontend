import React, { useEffect } from "react";
import { compose } from "redux";
import { getRastrSchemeInfo, startCalculation} from '../../redux/calculationForm-reducer';
import { getRastrFiles } from '../../redux/rastrFiles-reducer';
import { connect } from 'react-redux';
import  CalculationFormNew  from './CalculationFormNew';
import { fileType, rastrSchemeInfoType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
    rastrSchemeInfo: rastrSchemeInfoType
    rastrFiles: Array<fileType>
}
type MapDispatchpropsType = {
    getRastrFiles: () => void
    getRastrSchemeInfo: () => void
    startCalculation: (values: any, token: any) => void
}

type PropsType = MapStatePropsType & MapDispatchpropsType;

const CalculationFormContainer: React.FC<PropsType> = (props) => { 
    useEffect(() => {
        props.getRastrFiles();
        props.getRastrSchemeInfo();
    },[])

        return <>   
            <div>
                <CalculationFormNew rastrSchemeInfo={props.rastrSchemeInfo} startCalculation={props.startCalculation} 
                    rastrFiles={props.rastrFiles}/>
            </div>
            </> 
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        rastrSchemeInfo: state.calculationFormPage.rastrSchemeInfo,
        rastrFiles: state.rastrFilesPage.rastrFiles,
    }   
}

export default compose(
    connect(mapStateToProps, {getRastrSchemeInfo, startCalculation, getRastrFiles }))
    (CalculationFormContainer);
