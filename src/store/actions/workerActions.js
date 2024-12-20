import * as types from '../constants/actionTypes';
import { fetchWorkers, updateWorker, deleteWorker, addWorker } from '../../services/api';

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

export function deleteWorkerAction(workerId) {
  return async (dispatch) => {
    dispatch({ type: types.DELETE_WORKER });
    try {
      await deleteWorker(workerId)
      dispatch({
        type: types.DELETE_WORKER_SUCCESS,
        payload: workerId
      });
    } catch (error) {
      dispatch({
        type: types.DELETE_WORKER_FAILURE,
        payload: error.message
      });
    }
  };
}

// Додати екшен для додавання працівника
export function addWorkerAction(workerData) {
  return async (dispatch) => {
    dispatch({ type: types.ADD_WORKER });
    try {
      const newWorker = await addWorker(workerData); // Викликаємо addWorker з api.js
      dispatch({
        type: types.ADD_WORKER_SUCCESS,
        payload: newWorker
      });
    } catch (error) {
      dispatch({
        type: types.ADD_WORKER_FAILURE,
        payload: error.message
      });
    }
  };
}
