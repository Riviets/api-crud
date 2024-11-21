import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import { thunk } from 'redux-thunk'
import workerReducer from './reducers/workerReducer'

const store = configureStore({
  reducer: {
    workers: workerReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(thunk),
  devTools: true 
})

export default store