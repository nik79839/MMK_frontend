import React, { useEffect } from "react";
import { compose } from "redux";
import { getRastrFiles } from '../../redux/rastrFiles-reducer';
import { connect } from 'react-redux';
import  RastrFiles  from './RastrFiles';
import './RastrFiles.css'

const RastrFilesContainer = (props) => { 
    useEffect(  () => {
        props.getRastrFiles();     
    },[])

        return <>   
            <div className="table">
                <RastrFiles rastrFiles={props.rastrFiles} getRastrFiles={props.getRastrFiles} />
            </div>
            </> 
}

let mapStateToProps = (state) => {
    return {
        rastrFiles: state.rastrFilesPage.rastrFiles
    }   
}

export default compose(
    connect(mapStateToProps, {getRastrFiles}))
    (RastrFilesContainer);
