import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { getUsers, createUser } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import Users from "./Users";
import { AppStateType } from "../../redux/redux-store";
import { usersType } from "../../types/types";

type MapStatePropsType = {
    users: Array<usersType>
}
type MapDispatchpropsType = {
    getUsers: () => void
    createUser: (values: any) => void
}

type PropsType = MapStatePropsType & MapDispatchpropsType;

const UsersContainer: React.FC<PropsType> = React.memo((props) => {

    const [spin, setSpin] = useState(true);
    
    useEffect(() => {
        props.getUsers();
        setSpin(false);
    },[])

    const createUser = (user: any) => {
        props.createUser(user);
       }

    return(  
        <div>
            <Users users={props.users} createUser={createUser} spin={spin}/>
        </div>  )           
})

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.auth.users.users
    }   
}

export default compose(
    connect(mapStateToProps, { getUsers, createUser}))
    (UsersContainer);