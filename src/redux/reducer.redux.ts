import {combineReducers} from 'redux';
import userReducer from '@app/redux/user/user.slice';
import systemReducer from '@app/redux/system/system.slice';
import topicReducer from '@app/redux/topic/topic.slice';

export type AppState = ReturnType<typeof appReducers>;

export const appReducers = combineReducers({
  topic: topicReducer,
  user: userReducer,
  system: systemReducer,
});
