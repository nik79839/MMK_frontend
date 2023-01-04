import { calculationFormAPI } from "../api/api";

const SET_RASTRSCHEMEINFO = 'SET_RASTRSCHEMEINFO';

type sechType = {
    number: number 
    name: string
};
type districtType = {
    num: number
    nameSech: string
    brunches: any
};
type loadNodeType = {
    name: string
    number: number
    district: districtType
};

let initialState = {
    rastrSchemeInfo : {
        seches: [
            { number: 1, name:'testDistrict' },
        ] as Array<sechType>,
        districts: [
            { num: 1, nameSech:'testSech' , brunches: 'null' },
        ] as Array<districtType>,
        loadNodes : [
            {name: 'null', number: 12, district: {nameSech: 'null', num: 1, brunches: 'null'}}
        ] as Array<loadNodeType>
    }};

type initialStateType = typeof initialState;

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