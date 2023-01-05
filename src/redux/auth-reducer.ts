import { ThunkAction } from "redux-thunk";
import { authAPI } from "../api/api";
import { usersType, userType } from "../types/types";
import { AppStateType, InferActionsType } from "./redux-store";

const SET_USER = 'SET_USER';
const SET_USERS = 'SET_USERS';

let initialState = {
    user: {name: localStorage.getItem('user'), token: localStorage.getItem('token')} as userType,
    users: {
        userAmmount: 1,
        users: [{name:'null', login: 'null', post: 'null'}] as Array<usersType>}
};

type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => { 
    switch (action.type) {
        case SET_USER:
            return {                                     
                ...state,
                user: action.payload
            }
        case SET_USERS:
            return {                                     
                ...state,
                users: action.payload
            }
        default:                                     
            return state;
    }
}

const actions = {
    setUser: (user: userType) => ({ type: SET_USER,  payload: user}),
    setUsers: (users: Array<usersType>) => ({type: SET_USERS,  payload: users})
};

type ActionTypes = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUser = (values: any): ThunkType => {
    return async (dispatch) => { 
        let response = await authAPI.auth(values);
        if (response.status == 200 && response.data != null) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.name);
            dispatch(actions.setUser(response.data));
        }
        if (response.status == 400) {
            throw "Указаны неверные имя пользователя или пароль"
        }        
    }
}

export const getUsers = (): ThunkType => {
    return async (dispatch) => { 
        let response = await authAPI.getUsers();
        let data: Array<usersType> = response.data;
        dispatch(actions.setUsers(data));      
    }
}

export const createUser = (user: any) => {
    return async (dispatch: any) => { 
        await authAPI.createUser(user);
        getUsers();     
    }
}

export default authReducer;