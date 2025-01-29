import { combineReducers, configureStore } from '@reduxjs/toolkit';
//import chatReducer from '../features/chatSlice';

const rootReducer = combineReducers({});

const store = configureStore({
  reducer: rootReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
