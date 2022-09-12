import { rastrFilesAPI } from "../api/api";

const SET_FILES= 'SET_FILES';

let initialState = {
    rastrFiles: [
        { name: null, lastModified: null },
    ]
};

const RastrFilesReducer = (state = initialState, action) => { 
    switch (action.type) {
        case SET_FILES:
        return {                                     
                ...state,
                rastrFiles: action.rastrFiles
            }
        default:                                     
            return state;
    }
}

export const setRastrFiles = (rastrFiles) => (
    { type: SET_FILES,  rastrFiles  }
)
export const getRastrFiles = () => {
    return async (dispatch) => { 
        let response = await rastrFilesAPI.getRastrFiles();      
        dispatch(setRastrFiles(response.data));      
    }
}
export const postRastrFiles = (file) => {
    return async (dispatch) => { 
        debugger;
        let response = await rastrFilesAPI.postRastrFiles(file);
        if (response.status == 200) {     
        dispatch(setRastrFiles(response.data));}      
    }
}
 
export default RastrFilesReducer;