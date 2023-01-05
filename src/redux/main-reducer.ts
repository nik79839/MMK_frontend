import { mainAPI } from "../api/api";
import { withCallbacks} from 'redux-signalr';
import { calculationResultInfoType, calculationType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsType } from "./redux-store";

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

const actions = {
    setCalculations: (calculations: calculationType) => ({type: SET_CALCULATIONS,  payload: calculations}),
    setCalculationResultInfo: (calculationResultInfo: typeof initialState.calculationResultInfo) => (
        { type: SET_CALCULATIONRESULTINFO,  payload: calculationResultInfo  }),
    updateProgress: (progress: number, id: number) => ({ type: UPDATE_PROGRESS,  payload: {progress, id}})
}
type ActionTypes = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getCalculations = (): ThunkType => {
    return async (dispatch) => { 
        let response = await mainAPI.getCalculations();
        dispatch(actions.setCalculations(response.data));      
    }
}

export const getCalculationResultInfoById = (id: any): ThunkType => {
    return async (dispatch) => { 
        let response = await mainAPI.getCalculationStatisticById(id);
        dispatch(actions.setCalculationResultInfo(response.data));      
    }
}

export const deleteCalculationById = (id: any): ThunkType => {
    return async (dispatch) => { 
        let response = await mainAPI.deleteCalculationById(id);
        dispatch(actions.setCalculations(response.data));       
    }
}
 
export const callbacks = withCallbacks()
    .add('SendProgress', (msg, id) => (dispatch) => {
        console.log(msg);
    dispatch (actions.updateProgress(msg, id));
    if (msg === 100) {
        alert("Расчет завершен");
    }  
  }) 
export default mainReducer;