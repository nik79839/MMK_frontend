import { authAPI } from "../api/api";

const SET_USER = 'SET_USER';
const SET_USERS = 'SET_USERS';

type userType = {
    name: string
    token: string
}

type usersType = {
    name: string
    login: string
    post: string
}

let initialState = {
    user: {name: localStorage.getItem('user'), token: localStorage.getItem('token')} as userType,
    users: [{name:'null', login: 'null',post: 'null'}] as Array<usersType>
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
                users: action.users
            }
        default:                                     
            return state;
    }
}

type setUserActionType = {
    type: typeof SET_USER
    payload: userType
}

export const setUser = (user: userType): setUserActionType => (
    { type: SET_USER,  payload: user  }
)

export const getUser = (values: any) => {
    return async (dispatch: any) => { 
        let response = await authAPI.auth(values);
        if (response.status == 200 && response.data != null) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.name);
            dispatch(setUser(response.data));
        }
        if (response.status == 400) {
            throw "Указаны неверные имя пользователя или пароль"
        }        
    }
}

type setUsersActionType = {
    type: typeof SET_USERS
    payload: Array<usersType>
}

export const setUsers = (users: Array<usersType>): setUsersActionType => (
    { type: SET_USERS,  payload: users}
)
export const getUsers = () => {
    return async (dispatch: any) => { 
        let response = await authAPI.getUsers();
        dispatch(setUsers(response.data));      
    }
}

export const createUser = (user: any) => {
    return async (dispatch: any) => { 
        await authAPI.createUser(user);
        getUsers();     
    }
}

export const whoAmI = () => {
    return async (dispatch: any) => { 
        let response = await authAPI.whoAmI();
        if (response.status == 200) {
            dispatch(setUser(response.data));
        }           
    }
}

export default authReducer;