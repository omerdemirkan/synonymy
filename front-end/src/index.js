import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ---Redux---
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import palleteReducer from './store/reducers/pallete';
import userInputReducer from './store/reducers/userInput';
import inspectReducer from './store/reducers/inspect';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    pallete: palleteReducer,
    userInput: userInputReducer,
    inspect: inspectReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
