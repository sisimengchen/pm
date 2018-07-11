import { combineReducers } from 'redux-immutable';
import { createStore } from 'redux';
import Reducers from '../reducers';

// let devToolsEnhancer = null;
// if (process.env.NODE_ENV === 'development') {
// 	devToolsEnhancer = require('remote-redux-devtools');
// }

const reducers = combineReducers({ Reducers });
const store = createStore(reducers);
// let store = null;
// if (devToolsEnhancer) {
// 	store = createStore(reducers, devToolsEnhancer.default({ realtime: true, port: config.reduxDevPort }));
// } else {
// 	store = createStore(reducers);
// }
// let store = createStore(reducers);
export default store;
