import React, { useEffect } from "react";
import { compose } from "redux";
import { getRastrSchemeInfo, startCalculation} from '../../redux/calculationForm-reducer';
import { getRastrFiles } from '../../redux/rastrFiles-reducer';
import { connect } from 'react-redux';
import  CalculationFormNew  from './CalculationFormNew';

const CalculationFormContainer = (props) => { 
    useEffect(  () => {
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

let mapStateToProps = (state) => {
    return {
        rastrSchemeInfo: state.calculationFormPage.rastrSchemeInfo,
        rastrFiles: state.rastrFilesPage.rastrFiles,
    }   
}

export default compose(
    connect(mapStateToProps, {getRastrSchemeInfo, startCalculation, getRastrFiles }))
    (CalculationFormContainer);
