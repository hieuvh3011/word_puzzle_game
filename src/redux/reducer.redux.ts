import {combineReducers} from 'redux';
import userReducer from '@app/redux/user/user.slice';
import systemReducer from '@app/redux/system/system.slice';

export type AppState = ReturnType<typeof appReducers>;

export const appReducers = combineReducers({
  user: userReducer,
  system: systemReducer,
});
