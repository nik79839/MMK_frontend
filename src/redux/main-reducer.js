import { mainAPI } from "../api/api";

const SET_CALCULATIONS = 'SET_CALCULATIONS';

let initialState = {
    calculations: [
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

export default mainReducer;