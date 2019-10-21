import { createStore, combineReducers } from 'redux';

import counter from '../_reducers/counter';

// this global states
const reducers = combineReducers({
  counter
})

const store = createStore(reducers);

export default store