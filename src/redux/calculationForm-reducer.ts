import { calculationFormAPI } from "../api/api";
import { rastrSchemeInfoType } from "../types/types";

const SET_RASTRSCHEMEINFO = 'SET_RASTRSCHEMEINFO';

let initialState: initialStateType = {
    rastrSchemeInfo : {
        seches: [{ num: 1, sechName:'testDistrict', brunches: 'null' },],
        districts: [{ number: 1, name:'testSech'  },],
        loadNodes : [{name: 'null', number: 12, district: {name: 'null', number: 1}}],
        nodes : [{name: 'null', number: 12, district: {name: 'null', number: 1}}],
        brunches: [{startNode: 1, endNode: 2, parallelNumber: 1, name: 'test'}]
    }};

type initialStateType = {
    rastrSchemeInfo: rastrSchemeInfoType
};

const CalculationFormReducer = (state = initialState, action: any): initialStateType => { 
    switch (action.type) {
        case SET_RASTRSCHEMEINFO:
        return {                                     
                ...state,
                rastrSchemeInfo: action.payload
            }
        default:                                     
            return state;
    }
}

type setRastrSchemeInfoActionType = {
    type: typeof SET_RASTRSCHEMEINFO
    payload: initialStateType
}

export const setRastrSchemeInfo = (rastrSchemeInfo: initialStateType): setRastrSchemeInfoActionType => (
    { type: SET_RASTRSCHEMEINFO,  payload: rastrSchemeInfo  }
)
export const getRastrSchemeInfo = () => {
    return async (dispatch: any) => { 
        let response = await calculationFormAPI.getRastrSchemeInfo();      
        dispatch(setRastrSchemeInfo(response.data));      
    }
}

export const startCalculation = (values: any, token: any) => {
    return async () => { 
        await calculationFormAPI.startCalculation(values, token);
        //dispatch(setDistricts(response.data));      
    }
}
 
export default CalculationFormReducer;