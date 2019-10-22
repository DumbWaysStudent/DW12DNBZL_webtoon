import axios from 'axios'
import config from '../../config-env'


import {
    GET_ALL_TOON_PENDING,
    GET_ALL_TOON_FULFILLED,
    GET_ALL_TOON_REJECTED,
  } from '../_redux/types';

const initialState = {
  toons: [],
  error: null,
  isLoading: true,
}

const toons = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TOON_PENDING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_ALL_TOON_FULFILLED:
      return {
        ...state,
        toons: action.payload,
        isLoading: action.isLoading,
      };
    case GET_ALL_TOON_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}

export default toons