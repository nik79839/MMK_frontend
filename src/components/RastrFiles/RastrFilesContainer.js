import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { getRastrFiles } from '../../redux/rastrFiles-reducer';
import { connect } from 'react-redux';
import  RastrFiles  from './RastrFiles';

const RastrFilesContainer = (props) => { 
    
    const [spin, setSpin] = useState(true);
    
    useEffect(  () => {
        props.getRastrFiles();
        setSpin(false);
    },[])

        return <>   
            <div className="table">
                <RastrFiles rastrFiles={props.rastrFiles} getRastrFiles={props.getRastrFiles} spin={spin} />
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
