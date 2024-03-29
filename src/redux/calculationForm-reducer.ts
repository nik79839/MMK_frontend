import { ThunkAction } from "redux-thunk";
import { calculationFormAPI } from "../api/api";
import { rastrSchemeInfoType } from "../types/types";
import { AppStateType, InferActionsType } from "./redux-store";

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

const actions = {
    setRastrSchemeInfo: (rastrSchemeInfo: initialStateType) => ({type: SET_RASTRSCHEMEINFO, payload: rastrSchemeInfo})
};

type ActionTypes = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getRastrSchemeInfo = (): ThunkType => {
    return async (dispatch) => { 
        let response = await calculationFormAPI.getRastrSchemeInfo();      
        dispatch(actions.setRastrSchemeInfo(response.data));      
    }
}

export const startCalculation = (values: any, token: any) => {
    return async () => { 
        await calculationFormAPI.startCalculation(values, token);
        //dispatch(setDistricts(response.data));      
    }
}
 
export default CalculationFormReducer;