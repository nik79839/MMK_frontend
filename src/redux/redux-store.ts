import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import mainReducer from "./main-reducer";
import CalculationFormReducer from './calculationForm-reducer';
import RastrFilesReducer from './rastrFiles-reducer'

import {callbacks} from "./main-reducer";
import { HubConnectionBuilder, LogLevel, HttpTransportType, signalMiddleware} from 'redux-signalr';
import authReducer from "./auth-reducer";

let reducers = combineReducers({
    mainPage: mainReducer,
    calculationFormPage: CalculationFormReducer,
    rastrFilesPage: RastrFilesReducer,
    auth: authReducer
});

type reducersType = typeof reducers;
export type AppStateType = ReturnType<reducersType>;

const connection = new HubConnectionBuilder()
  .configureLogging(LogLevel.Debug)
  .withUrl('https://localhost:5001/progress', {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .build();

const signal = signalMiddleware({
    callbacks,
    connection,
  });

  // @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware,signal)));
// @ts-ignore
window.__store__ = store;

export default store;