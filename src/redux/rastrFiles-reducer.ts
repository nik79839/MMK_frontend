import { rastrFilesAPI } from "../api/api";
import { fileType } from "../types/types";

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

type setRastrFilesActionType = {
    type: typeof SET_FILES
    payload: initialStateType
}

export const setRastrFiles = (rastrFiles: initialStateType): setRastrFilesActionType => (
    { type: SET_FILES,  payload: rastrFiles  }
)
export const getRastrFiles = () => {
    return async (dispatch: any) => { 
        let response = await rastrFilesAPI.getRastrFiles();
        let data: initialStateType = response.data;
        debugger;
        dispatch(setRastrFiles(data));
    }
}
export const postRastrFiles = (file: any) => {
    return async (dispatch: any) => { 
        let response = await rastrFilesAPI.postRastrFiles(file);
        if (response.status === 200) {     
        dispatch(setRastrFiles(response.data));}      
    }
}
 
export default RastrFilesReducer;