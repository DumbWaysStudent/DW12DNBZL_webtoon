
import {
    GET_ALL_FAV_PENDING,
    GET_ALL_FAV_FULFILLED,
    GET_ALL_FAV_REJECTED,
  } from '../_redux/types';

const initialState = {
  fav: [],
  error: null,
  isLoading: true,
}

const fav = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FAV_PENDING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_ALL_FAV_FULFILLED:
      return {
        ...state,
        fav: action.payload,
        isLoading: action.isLoading,
      };
    case GET_ALL_FAV_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}

export default fav