import React, { useEffect } from "react";
import { compose } from "redux";
import { getSeches, getDistricts,startCalculation, getLoadNodes } from '../../redux/calculationForm-reducer';
import { getRastrFiles } from '../../redux/rastrFiles-reducer';
import { connect } from 'react-redux';
import  CalculationFormNew  from './CalculationFormNew';

const CalculationFormContainer = (props) => { 
    useEffect(  () => {
        props.getSeches();
        props.getRastrFiles();
        props.getLoadNodes();
        props.getDistricts();
    },[])


        return <>   
            <div>
                <CalculationFormNew seches={props.seches} startCalculation={props.startCalculation} rastrFiles={props.rastrFiles}
                    loadNodes={props.loadNodes} districts={props.districts} />
            </div>
            </> 
}

let mapStateToProps = (state) => {
    return {
        seches: state.calculationFormPage.seches,
        rastrFiles: state.rastrFilesPage.rastrFiles,
        loadNodes: state.calculationFormPage.loadNodes,
        districts: state.calculationFormPage.districts
    }   
}

export default compose(
    connect(mapStateToProps, {getSeches, getDistricts, startCalculation, getRastrFiles, getLoadNodes, getDistricts}))
    (CalculationFormContainer);
