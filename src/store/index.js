/* global NODE_ENV */
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducer/index';
//import callAPI from '../middlewares/callAPI';
import thunk from 'redux-thunk';

let composeFuncList = [applyMiddleware(/*callAPI, */thunk)];

if (typeof NODE_ENV === 'string' && NODE_ENV === 'development') {
	composeFuncList.push(window.devToolsExtension ? window.devToolsExtension() : f => f);
}

const enhancer = compose(
	...composeFuncList
);

const store = createStore(reducer, {}, enhancer);

export default store;