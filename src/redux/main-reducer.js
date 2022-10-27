import { mainAPI } from "../api/api";
import { withCallbacks} from 'redux-signalr';
import * as axios from "axios";

const SET_CALCULATIONS = 'SET_CALCULATIONS';
const DELETE_CALCULATION = 'DELETE_CALCULATION';
const SET_CALCULATIONRESULTINFO = 'SET_CALCULATIONRESULTINFO';
const UPDATE_PROGRESS = 'UPDATE_PROGRESS';

let initialState = {
    calculations: [
        { id: 'iyk', name:'testInitial' , calculationStart: null, calculationEnd: null,progress: null },
    ],

    calculationResultInfo: {
        processedResult: {
            powerFlowResultProcessed: {maximum: '20',minimum: '13', mean: '18', stD: '9', histogramData: [{interval: '1-2', height: '0,012'}]},
            voltageResultProcessed: [{nodeNumber: 'testNum', histogramData: [{interval: '1-2', height: '0,012'}]},
                {nodeNumber: 'testNum2', histogramData: [{interval: '1-2', height: '0,012'}]}],
            currentResultProcessed: []},
        initialResult: {
            powerFlowResults: [{powerFlowLimit: 868, calculationId: "282cac56",implementationId: 1}],
            voltageResults: [{nodeNumber: 2643,nodeName: "Север",voltageValue: 176,calculationId: "282ca",implementationId: 1}],
            currentResults: []
        },
        worseningSettings: [1654, 2653]
}};

const mainReducer = (state = initialState, action) => { 
    switch (action.type) {
        case SET_CALCULATIONS:
        return {                                     
                ...state,
                calculations: action.calculations
            }
        case SET_CALCULATIONRESULTINFO:
            return {                                     
                ...state,
                calculationResultInfo: action.calculationResultInfo
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

export const setCalculationResultInfo = (calculationResultInfo) => (
    { type: SET_CALCULATIONRESULTINFO,  calculationResultInfo: calculationResultInfo  }
)
export const getCalculationResultInfoById = (id) => {
    return async (dispatch) => { 
        let response = await mainAPI.getCalculationStatisticById(id);
        dispatch(setCalculationResultInfo(response.data));      
    }
}

export const deleteCalculationById = (id) => {
    return async (dispatch) => { 
        let response = await mainAPI.deleteCalculationById(id);
        dispatch(setCalculations(response.data));       
    }
}

export const updateProgress = (progress,calculationId) => (
    { type: UPDATE_PROGRESS,  progress,calculationId  }
)
 
export const callbacks = withCallbacks()
    .add('SendProgress', (msg,id) => (dispatch) => {
    console.log(msg);
    dispatch (updateProgress(msg,id));
    if (msg == 100) {
        alert("Расчет завершен");
    }  
  }) 
export default mainReducer;