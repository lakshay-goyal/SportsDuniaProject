import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import newsReducer from './reducers/newsReducer';
import payoutReducer from './reducers/payoutReducer';

const rootReducer = combineReducers({
  news: newsReducer,
  payouts: payoutReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

