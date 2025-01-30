import { combineReducers, configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
const rootReducer = combineReducers({
  chats: chatReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
