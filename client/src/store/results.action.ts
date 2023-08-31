import axios from "axios";
import { User } from "@/utils/interfaces";

export const SET_DATA_REQUEST = '[RESULTS] SET REQUEST';
export const SET_DATA_SUCCESS = '[RESULTS] SET SUCCESS';
export const SET_DATA_FAILED = '[RESULTS] SET FAILED';

export const createUserData = (user: any): any => (dispatch: any) => {
  dispatch({ type: SET_DATA_REQUEST });

  return axios.post('http://localhost:8080/api/table', user)
    .then(() => {
      axios.get('http://localhost:8080/api/table')
        .then(({ data }) => {
          dispatch({
            type: SET_DATA_SUCCESS,
            payload: data
          });

          return data;
        })
        .catch(error => {
          dispatch({
            type: SET_DATA_FAILED,
            error
          });

          return error;
        });
    });
}

export const getUserData = (): any => (dispatch: any) => {
  dispatch({ type: SET_DATA_REQUEST });

  return axios.get('http://localhost:8080/api/table')
    .then(({ data }) => {
      dispatch({
        type: SET_DATA_SUCCESS,
        payload: data
      });

      return data;
    })
    .catch(error => {
      dispatch({
        type: SET_DATA_FAILED,
        error
      });

      return error;
    });
}

export const updateUserData = (user: User): any => (dispatch: any) => {
  const { _id, firstName, lastName, email } = user;

  return axios.put(`http://localhost:8080/api/table?id=${_id}`, { firstName, lastName, email })
    .then(() => {
      axios.get('http://localhost:8080/api/table')
        .then(({ data }) => {
          dispatch({
            type: SET_DATA_SUCCESS,
            payload: data
          });

          return data;
        })
        .catch(error => {
          dispatch({
            type: SET_DATA_FAILED,
            error
          });

          return error;
        });
    })
}

export const deleteUserData = (user: User): any => (dispatch: any) => {
  return axios.delete(`http://localhost:8080/api/table?id=${user._id}`)
    .then(() => {
      axios.get('http://localhost:8080/api/table')
        .then(({ data }) => {
          dispatch({
            type: SET_DATA_SUCCESS,
            payload: data
          });

          return data;
        })
        .catch(error => {
          dispatch({
            type: SET_DATA_FAILED,
            error
          });

          return error;
        });
    })
}