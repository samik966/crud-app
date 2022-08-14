import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { combinedReducers } from './reducers'

const middlewares = applyMiddleware(thunkMiddleware)
const composedEnhacers = compose(middlewares, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const store = createStore(combinedReducers, undefined, composedEnhacers)

