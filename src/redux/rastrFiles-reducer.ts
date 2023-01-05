import { ThunkAction } from "redux-thunk";
import { rastrFilesAPI } from "../api/api";
import { fileType } from "../types/types";
import { AppStateType, InferActionsType } from "./redux-store";

const SET_FILES= 'SET_FILES';


type initialStateType = typeof initialState;

let initialState  = {
    rastrFiles: [
        { name: 'null', lastModified: 'null' },
        { name: 'null2', lastModified: 'null2' }
    ] as Array<fileType>
};


const RastrFilesReducer = (state = initialState, action: any): initialStateType  => { 
    switch (action.type) {
        case SET_FILES:
        return {                                     
                ...state,
                rastrFiles: action.payload
            }
        default:                                     
            return state;
    }
}

const actions = {
    setRastrFiles: (rastrFiles: initialStateType) => ({type: SET_FILES,  payload: rastrFiles})
}

type ActionTypes = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

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