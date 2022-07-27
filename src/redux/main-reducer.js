import { mainAPI } from "../api/api";
import { withCallbacks} from 'redux-signalr';

const SET_CALCULATIONS = 'SET_CALCULATIONS';
const SET_CALCULATIONSTATISTIC = 'SET_CALCULATIONSTATISTIC';
const UPDATE_PROGRESS = 'UPDATE_PROGRESS';

let initialState = {
    calculations: [
        { calculationId: 'iyk', name:'testInitial' , calculationStart: null, calculationEnd: null,progress: null },
    ],

    calculationStatistic:
    [
        { maximum: '20',minimum: '13', mean: '18', stD: '9', calculationResultProcessed: {interval: '1-2', height: '0,012'}},
        { maximum: '25',minimum: '12', mean: '16', stD: '8', calculationResultProcessed: {interval: '1-3', height: '0,024'} },
    ]
};

const mainReducer = (state = initialState, action) => { 
    switch (action.type) {
        case SET_CALCULATIONS:
        return {                                     
                ...state,
                calculations: action.calculations
            }
        case SET_CALCULATIONSTATISTIC:
            return {                                     
                ...state,
                calculationStatistic: action.calculationStatistic
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

export const setCalculationStatistic = (calculationStatistic) => (
    { type: SET_CALCULATIONSTATISTIC,  calculationStatistic: calculationStatistic  }
)
export const getCalculationStatisticById = (id) => {
    return async (dispatch) => { 
        let response = await mainAPI.getCalculationStatisticById(id);
        dispatch(setCalculationStatistic(response.data));      
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