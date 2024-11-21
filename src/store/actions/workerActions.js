import * as types from '../constants/actionTypes';
import { fetchWorkers, updateWorker } from '../../services/api';

export function fetchWorkersAction() {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_WORKERS });
    try {
      const workers = await fetchWorkers();
      dispatch({
        type: types.FETCH_WORKERS_SUCCESS,
        payload: workers
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_WORKERS_FAILURE,
        payload: error.message
      });
    }
  };
}

export function updateWorkerAction(workerId, workerData) {
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_WORKER });
    try {
      const updatedWorker = await updateWorker(workerId, workerData);
      dispatch({
        type: types.UPDATE_WORKER_SUCCESS,
        payload: updatedWorker
      });
    } catch (error) {
      dispatch({
        type: types.UPDATE_WORKER_FAILURE,
        payload: error.message
      });
    }
  };
}