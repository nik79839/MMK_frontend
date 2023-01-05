import { mainAPI } from "../api/api";
import { withCallbacks} from 'redux-signalr';
import { calculationResultInfoType, calculationType } from "../types/types";

const SET_CALCULATIONS = 'SET_CALCULATIONS';
const SET_CALCULATIONRESULTINFO = 'SET_CALCULATIONRESULTINFO';
const UPDATE_PROGRESS = 'UPDATE_PROGRESS';

let initialState = {
    calculations: {
        calculationAmount: 2,
        calculations: [
        { id: 'iyk', name:'testInitial' , calculationEnd: 'null', progress: 0 },
    ] as Array<calculationType>},

    calculationResultInfo: {
            powerFlowResultProcessed: {maximum: '20',minimum: '13', mean: '18', stD: '9', histogramData: [{interval: '1-2', height: '0,012'}]},
            voltageResultProcessed: [{nodeName: 'testNum', histogramData: [{interval: '1-2', height: '0,012'}]},
                {nodeNumber: 'testNum2', histogramData: [{interval: '1-2', height: '0,012'}]}] ,
            currentResultProcessed: [{brunchName : 'testNum', histogramData: [{interval: '1-2', height: '0,012'}]},
                {nodeNumber: 'testNum2', histogramData: [{interval: '1-2', height: '0,012'}]}],

            powerFlowResults: [{value: 868, implementationId: 1}],
            voltageResults: [{nodeNumber: 2643,nodeName : "Север", value: 176, implementationId: 1}],
            currentResults: [{brunchName : "Север-asgag", value: 176, implementationId: 1}],
            worseningSettings: [1654, 2653]
} as calculationResultInfoType};
type initialStateType = typeof initialState;

const mainReducer = (state = initialState, action: any): initialStateType => { 
    switch (action.type) {
        case SET_CALCULATIONS:
        return {                                     
                ...state,
                calculations: action.payload
            }
        case SET_CALCULATIONRESULTINFO:
            return {                                     
                ...state,
                calculationResultInfo: action.payload
            }
        case UPDATE_PROGRESS:
            let updatedList = [...state.calculations.calculations];
            for (let i = 0;i<updatedList.length;i++) {
                if (updatedList[i].id === action.payload.id)
                    {
                        updatedList[i].progress = action.payload.progress;
                    }
            }   
            return {                                     
                ...state,
                calculations: {calculations: updatedList, calculationAmount: updatedList.length}
            }
        default:                                     
            return state;
    }
}

type setCalculationsActionType = {
    type: typeof SET_CALCULATIONS
    payload: calculationType
}
export const setCalculations = (calculations: calculationType): setCalculationsActionType => (
    { type: SET_CALCULATIONS,  payload: calculations  }
)
export const getCalculations = () => {
    return async (dispatch: any) => { 
        let response = await mainAPI.getCalculations();
        dispatch(setCalculations(response.data));      
    }
}

type setCalculationResultInfoActionType = {
    type: typeof SET_CALCULATIONRESULTINFO
    payload: typeof initialState.calculationResultInfo
}
export const setCalculationResultInfo = (calculationResultInfo: typeof initialState.calculationResultInfo): setCalculationResultInfoActionType => (
    { type: SET_CALCULATIONRESULTINFO,  payload: calculationResultInfo  }
)
export const getCalculationResultInfoById = (id: any) => {
    return async (dispatch: any) => { 
        let response = await mainAPI.getCalculationStatisticById(id);
        dispatch(setCalculationResultInfo(response.data));      
    }
}

export const deleteCalculationById = (id: any) => {
    return async (dispatch: any) => { 
        let response = await mainAPI.deleteCalculationById(id);
        dispatch(setCalculations(response.data));       
    }
}

type updateProgressActionType = {
    type: typeof UPDATE_PROGRESS
    payload: {progress: number 
        id: number}
}
export const updateProgress = (progress: number, id: number): updateProgressActionType => (
    { type: UPDATE_PROGRESS,  payload: {progress, id}  }
)
 
export const callbacks = withCallbacks()
    .add('SendProgress', (msg, id) => (dispatch) => {
        console.log(msg);
    dispatch (updateProgress(msg, id));
    if (msg === 100) {
        alert("Расчет завершен");
    }  
  }) 
export default mainReducer;