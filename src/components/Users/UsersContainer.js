import React, { useEffect } from "react";
import { compose } from "redux";
import { getUsers, createUser } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import Users from "./Users";

const UsersContainer = React.memo((props) => {

    useEffect(() => {
        props.getUsers();  
    },[])

    const createUser = (user) => {
        props.createUser(user);
       }

    return(  
        <div>
            <Users users={props.users} createUser={createUser}/>
        </div>  )           
})

let mapStateToProps = (state) => {
    return {
        users: state.auth.users
    }   
}

export default compose(
    connect(mapStateToProps, { getUsers, createUser}))
    (UsersContainer);