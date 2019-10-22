import { createStore, combineReducers, applyMiddleware } from 'redux';

import toons from '../_reducers/toons'
import { logger, thunk } from './middleware'
import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/toons';
import axios from 'axios'

import {ip} from '../ip'


export const getAllToon = () => {
  return dispatch => {
    dispatch(fetchData(true));
    axios({
      method: 'GET',
      url: `${ip}/webtoons`
    }).then(res => {
      dispatch(fetchDataFulfilled(res.data))
    })
    .catch(error => {
      dispatch(fetchDataRejected(error));
    });
  }
}


const reducers = combineReducers({
  toons
})
  
const store = createStore(
  reducers,
  applyMiddleware(logger, thunk));

export default store