import { combineReducers } from 'redux'
import postReducer from './postReducer'

export const combinedReducers = combineReducers({
  posts: postReducer
})
