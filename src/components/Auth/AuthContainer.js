import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { compose } from "redux";
import { getUser } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import  Auth  from './Auth';
import {useNavigate} from "react-router-dom"

const AuthContainer = React.memo((props) => {

    let navigate = useNavigate();

    if (!props.auth) { {
    return(  
        <div>
            <Auth getUser={props.getUser}/>
        </div>  )           
}}
    else {
        navigate("/");
    }
})

let mapStateToProps = (state) => {
    return {
        auth: state.auth.isAuth
    }   
}

export default compose(
    connect(mapStateToProps, { getUser}))
    (AuthContainer);