import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import mainReducer from "./main-reducer";
import CalculationFormReducer from './rastrFiles-reducer';
import RastrFilesReducer from './rastrFiles-reducer'

import {callbacks} from "./main-reducer";
import { HubConnectionBuilder, LogLevel, HttpTransportType, signalMiddleware} from 'redux-signalr';

let reducers = combineReducers({
    mainPage: mainReducer,
    calculationFormPage: CalculationFormReducer,
    rastrFilesPage: RastrFilesReducer,
});

const connection = new HubConnectionBuilder()
  .configureLogging(LogLevel.Debug)
  .withUrl('https://localhost:7231/progress', {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .build();

const signal = signalMiddleware({
    callbacks,
    connection,
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware,signal)));

window.__store__ = store;

export default store;