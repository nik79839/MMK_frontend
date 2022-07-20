import { mainAPI } from "../api/api";
import { withCallbacks} from 'redux-signalr';

const SET_CALCULATIONS = 'SET_CALCULATIONS';
const SET_CALCULATIONRESULT = 'SET_CALCULATIONRESULT';
const UPDATE_PROGRESS = 'UPDATE_PROGRESS';

let initialState = {
    calculations: [
        { calculationId: 'iyk', name:'testInitial' , calculationStart: null, calculationEnd: null,progress: null },
    ],

    calculationResult:
    [
        { interval: '1-2',height: '0,012' },
        { interval: '2-3',height: '0,02' },
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
        case UPDATE_PROGRESS:
            let updatedList = [...state.calculations];
            for (let i=0;i<updatedList.length;i++) {
                if (updatedList[i].calculationId == action.calculationId)
                    {
                        updatedList[i].progress=action.progress;
                    }
            }   
            return {                                     
                ...state,
                calculations: updatedList
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

export const updateProgress = (progress,calculationId) => (
    { type: UPDATE_PROGRESS,  progress,calculationId  }
)
 
export const callbacks = withCallbacks()
    .add('SendProgress', (msg,id) => (dispatch) => {
    console.log(msg);
        dispatch (updateProgress(msg,id));
  })
 
export default mainReducer;