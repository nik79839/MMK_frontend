import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { getRastrFiles } from '../../redux/rastrFiles-reducer';
import { connect } from 'react-redux';
import  RastrFiles  from './RastrFiles';
import { fileType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
    rastrFiles: Array<fileType>
}
type MapDispatchpropsType = {
    getRastrFiles: () => void
}

type PropsType = MapStatePropsType & MapDispatchpropsType;

const RastrFilesContainer: React.FC<PropsType> = (props) => { 
    
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

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        rastrFiles: state.rastrFilesPage.rastrFiles
    }   
}

export default compose(
    connect(mapStateToProps, {getRastrFiles}))
    (RastrFilesContainer);
