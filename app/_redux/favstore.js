import { createStore, combineReducers, applyMiddleware } from 'redux';

import favorite from '../_reducers/favorite'
import { logger, thunk } from './middleware'
import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/favorite';
import axios from 'axios'

import {ip} from '../ip'


export const getAllFav = (id_user) => {
  return dispatch => {
    dispatch(fetchData(true));
    axios({
      method: 'GET',
      url: `${ip}/user/${id_user}/favorites`
    }).then(res => {
      dispatch(fetchDataFulfilled(res.data))
    })
    .catch(error => {
      dispatch(fetchDataRejected(error));
    });
  }
}


const reducers = combineReducers({
  favorite
})
  
const favstore = createStore(
  reducers,
  applyMiddleware(logger, thunk));

export default favstore