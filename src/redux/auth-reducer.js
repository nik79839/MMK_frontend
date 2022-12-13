import { authAPI } from "../api/api";

const SET_USER = 'SET_USER';

let initialState = {
    isAuth: false,
    user: {name: localStorage.getItem('user'), token: localStorage.getItem('token')}
};

const authReducer = (state = initialState, action) => { 
    switch (action.type) {
        case SET_USER:
            return {                                     
                ...state,
                isAuth: true,
                user: action.user
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

export const whoAmI = () => {
    return async (dispatch) => { 
        let response = await authAPI.whoAmI();
        if (response.status == 200) {
            dispatch(setUser(response.data));
        }           
    }
}

export default authReducer;