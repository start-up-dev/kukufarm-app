import {combineReducers} from '@reduxjs/toolkit';
import searchUsers from './searchUsers';

const inboxReducer = combineReducers({
  searchUsers,
});

export default inboxReducer;
