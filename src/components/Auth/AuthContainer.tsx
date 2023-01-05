import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { compose } from "redux";
import { getUser } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import  Auth  from './Auth';
import {useNavigate} from "react-router-dom"
import { AppStateType } from "../../redux/redux-store";
import { userType } from "../../types/types";

type MapStatePropsType = {
    user: userType
}
type MapDispatchpropsType = {
    getUser: (values: any) => void
}

type PropsType = MapStatePropsType & MapDispatchpropsType;

const AuthContainer: React.FC<PropsType> = (props) => {

    let navigate = useNavigate();

    if (props.user.name != 'null') { {
    return(  
        <div>
            <Auth getUser={props.getUser}/>
        </div>  )           
}}
    else {
        navigate("/");
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        user: state.auth.user
    }   
}

export default compose(
    connect(mapStateToProps, { getUser}))
    (AuthContainer);