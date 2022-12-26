import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from 'react-redux';
import NavMenu from "./NavMenu";

const CalculationsUIDContainer = (props) => { 

        return <>   
            <div>
                <NavMenu user = {props.user}/>
            </div>
            </> 
}

let mapStateToProps = (state) => {
    return {
        auth: state.auth.user
    }   
}

export default compose(
    connect(mapStateToProps))
    (CalculationsUIDContainer);
