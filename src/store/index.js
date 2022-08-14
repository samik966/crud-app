import { configureStore } from '@reduxjs/toolkit'
import { combinedReducers } from './slices'

export const store = configureStore({
  reducer: combinedReducers,
})
