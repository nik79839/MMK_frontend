import { mainAPI, calculationFormAPI } from "../api/api";

const SET_SECHES= 'SET_SECHES';
const SET_DISTRICTS= 'SET_DISTRICTS';

let initialState = {
    seches: [
        { number: '1', name:'testDistrict' },
    ],
    districts: [
        { num: '1', nameSech:'testSech' , brunches: null },
    ],
};

const CalculationFormReducer = (state = initialState, action) => { 
    switch (action.type) {
        case SET_SECHES:
        return {                                     
                ...state,
                seches: action.seches
            }
        case SET_DISTRICTS:
        return {                                     
                ...state,
                seches: action.seches
            }
        default:                                     
            return state;
    }
}

export const setSeches = (seches) => (
    { type: SET_SECHES,  seches  }
)
export const getSeches = () => {
    return async (dispatch) => { 
        let response = await calculationFormAPI.getSeches();      
        dispatch(setSeches(response.data));      
    }
}

export const setDistricts = (districts) => (
    { type: SET_DISTRICTS,  districts  }
)
export const getDistricts = () => {
    return async (dispatch) => { 
        let response = await calculationFormAPI.getDistricts();
        dispatch(setDistricts(response.data));      
    }
}
 
export default CalculationFormReducer;