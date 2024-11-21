import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import workerReducer from './reducers/workerReducer';


const store = configureStore({
  reducer: {
    workers: workerReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
