import { calculationFormAPI } from "../api/api";

const SET_SECHES= 'SET_SECHES';
const SET_DISTRICTS= 'SET_DISTRICTS';
const SET_LOADNODES= 'SET_LOADNODES';

let initialState = {
    seches: [
        { number: '1', name:'testDistrict' },
    ],
    districts: [
        { num: '1', nameSech:'testSech' , brunches: null },
    ],
    loadNodes: [
        {name: null, number: null, district: {name: null, number: null}}
    ]
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
                districts: action.districts
            }
        case SET_LOADNODES:
        return {                                     
                ...state,
                loadNodes: action.loadNodes
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

export const setLoadNodes = (loadNodes) => (
    { type: SET_LOADNODES,  loadNodes  }
)
export const getLoadNodes = () => {
    return async (dispatch) => { 
        let response = await calculationFormAPI.getLoadNodes();      
        dispatch(setLoadNodes(response.data));      
    }
}

export const startCalculation = (values, token) => {
    return async () => { 
        let response = await calculationFormAPI.startCalculation(values, token);
        //dispatch(setDistricts(response.data));      
    }
}
 
export default CalculationFormReducer;