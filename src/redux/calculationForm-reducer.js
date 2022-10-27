import { calculationFormAPI } from "../api/api";

const SET_RASTRSCHEMEINFO= 'SET_RASTRSCHEMEINFO';

let initialState = {
    rastrSchemeInfo : {
        seches: [
            { number: '1', name:'testDistrict' },
        ],
        districts: [
            { num: '1', nameSech:'testSech' , brunches: null },
        ],
        loadNodes: [
            {name: null, number: null, district: {name: null, number: null}}
        ]
    }};

const CalculationFormReducer = (state = initialState, action) => { 
    switch (action.type) {
        case SET_RASTRSCHEMEINFO:
        return {                                     
                ...state,
                rastrSchemeInfo: action.rastrSchemeInfo
            }
        default:                                     
            return state;
    }
}

export const setRastrSchemeInfo = (rastrSchemeInfo) => (
    { type: SET_RASTRSCHEMEINFO,  rastrSchemeInfo  }
)
export const getRastrSchemeInfo = () => {
    return async (dispatch) => { 
        let response = await calculationFormAPI.getRastrSchemeInfo();      
        dispatch(setRastrSchemeInfo(response.data));      
    }
}

export const startCalculation = (values, token) => {
    return async () => { 
        let response = await calculationFormAPI.startCalculation(values, token);
        //dispatch(setDistricts(response.data));      
    }
}
 
export default CalculationFormReducer;