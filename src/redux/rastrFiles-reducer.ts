import { Action, Dispatch } from "redux";
import { AnyAction } from "redux-signalr";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { rastrFilesAPI } from "../api/api";
import { fileType } from "../types/types";
import { AppStateType, InferActionsType } from "./redux-store";

type initialStateType = typeof initialState;

let initialState  = {
    rastrFiles: [
        { name: 'null', lastModified: 'null' },
        { name: 'null2', lastModified: 'null2' }
    ] as Array<fileType>
};

const RastrFilesReducer = (state = initialState, action: any): initialStateType  => { 
    switch (action.type) {
        case 'SET_FILES':
        return {                                     
                ...state,
                rastrFiles: action.payload
            }
        default:                                     
            return state;
    }
}

const actions = {
    setRastrFiles: (rastrFiles: initialStateType) => ({type: 'SET_FILES',  payload: rastrFiles} as const)
}

type ActionTypes = InferActionsType<typeof actions>;
type DiaspatchType = Dispatch<ActionTypes>;
type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AnyAction>;
type ThunkType = BaseThunkType<ActionTypes | AnyAction>;

export const getRastrFiles = (): ThunkType => {
    return async (dispatch) => { 
        let response = await rastrFilesAPI.getRastrFiles();
        let data: initialStateType = response.data;
        dispatch(actions.setRastrFiles(data));
    }   
}
export const postRastrFiles = (file: any): ThunkType => {
    return async (dispatch) => { 
        let response = await rastrFilesAPI.postRastrFiles(file);
        if (response.status === 200) {     
        dispatch(actions.setRastrFiles(response.data));}      
    }
}
 
export default RastrFilesReducer;