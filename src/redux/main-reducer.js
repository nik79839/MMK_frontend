import { mainAPI } from "../api/api";

const SET_CALCULATIONS = 'SET_CALCULATIONS';
const SET_CALCULATIONRESULT = 'SET_CALCULATIONRESULT';

let initialState = {
    calculations: [
        { calculationId: 'iyk', name:'testInitial' , calculationStart: null, calculationEnd: null },
    ],

    calculationResult:
    [
        { calculationId: 'iyk', implementationId: '1',powerFlowLimit: '100' },
        { calculationId: 'iyk', implementationId: '2',powerFlowLimit: '103' },
    ]
};

const mainReducer = (state = initialState, action) => { 
    switch (action.type) {
        case SET_CALCULATIONS:
            return {                                     
                ...state,
                calculations: action.calculations
            }
        case SET_CALCULATIONRESULT:
            return {                                     
                ...state,
                calculationResult: action.calculationResult
            }
        default:                                     
            return state;
    }
}

export const setCalculations = (calculations) => (
    { type: SET_CALCULATIONS,  calculations  }
)
export const getCalculations = () => {
    return async (dispatch) => { 
        let response = await mainAPI.getCalculations();
        dispatch(setCalculations(response.data));      
    }
}

export const setCalculationResult = (calculationResult) => (
    { type: SET_CALCULATIONRESULT,  calculationResult  }
)
export const getCalculationResultById = (id) => {
    return async (dispatch) => { 
        let response = await mainAPI.getCalculationResultById(id);
        dispatch(setCalculationResult(response.data));      
    }
}

export default mainReducer;