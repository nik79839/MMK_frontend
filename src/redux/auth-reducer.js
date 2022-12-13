import { authAPI } from "../api/api";

const SET_USER = 'SET_USER';
const SET_USERS = 'SET_USERS';

let initialState = {
    user: {name: localStorage.getItem('user'), token: localStorage.getItem('token')},
    users: [{name:null, login: null,post: null}]
};

const authReducer = (state = initialState, action) => { 
    switch (action.type) {
        case SET_USER:
            return {                                     
                ...state,
                user: action.user
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

export const setUser = (user) => (
    { type: SET_USER,  user  }
)

export const getUser = (values) => {
    return async (dispatch) => { 
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

export const setUsers = (users) => (
    { type: SET_USERS,  users  }
)
export const getUsers = () => {
    return async (dispatch) => { 
        let response = await authAPI.getUsers();
        dispatch(setUsers(response.data));      
    }
}

export const createUser = (user) => {
    return async (dispatch) => { 
        await authAPI.createUser(user);
        getUsers();     
    }
}

export const whoAmI = () => {
    return async (dispatch) => { 
        let response = await authAPI.whoAmI();
        if (response.status == 200) {
            dispatch(setUser(response.data));
        }           
    }
}

export default authReducer;