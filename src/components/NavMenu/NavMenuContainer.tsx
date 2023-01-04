import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from 'react-redux';
import NavMenu from "./NavMenu";
import { userType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
    user: userType
}

type PropsType = MapStatePropsType;

const CalculationsUIDContainer: React.FC<PropsType> = (props) => { 

        return <>   
            <div>
                <NavMenu />
            </div>
            </> 
}

let mapStateToProps = (state: AppStateType) => {
    return {
        auth: state.auth.user
    }   
}

export default compose(
    connect(mapStateToProps))
    (CalculationsUIDContainer);
