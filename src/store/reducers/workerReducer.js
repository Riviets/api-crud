import * as types from '../constants/actionTypes';

const initialState = {
  workers: [],
  loading: false,
  error: null
};

export default function workerReducer(state = initialState, action) {
    console.log('Action received:', action);
  switch (action.type) {
    case types.FETCH_WORKERS:
    case types.UPDATE_WORKER:
      return { ...state, loading: true };

    case types.FETCH_WORKERS_SUCCESS:
      return {
        ...state,
        loading: false,
        workers: action.payload,
        error: null
      };

    case types.UPDATE_WORKER_SUCCESS:
      return {
        ...state,
        loading: false,
        workers: state.workers.map(worker => 
          worker.id === action.payload.id ? action.payload : worker
        ),
        error: null
      };

    case types.FETCH_WORKERS_FAILURE:
    case types.UPDATE_WORKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}