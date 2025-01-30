import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { sendMessage } from '../../service/greenApi';
import { getUserData } from '../../service/getUserData';

type SendMessageResponse = {
  message: string;
  status: string;
  timestamp: string;
};

type ChatState = {
  idInstance: string;
  apiTokenInstance: string;
  messages: string[];
  chats: string[];
  loading: boolean;
  error: string | null;
};

const initialState: ChatState = {
  idInstance: '',
  apiTokenInstance: '',
  messages: [],
  chats: [],
  loading: false,
  error: null,
};

type SendMessageArgs = {
  idInstance: string;
  apiTokenInstance: string;
  chatId: string;
  message: string;
};

export const setUserDataThunk = createAsyncThunk<
  string[],
  { idInstance: string; apiTokenInstance: string }
>('chat/setUserData', async ({ idInstance, apiTokenInstance }) => {
  const response = await getUserData(idInstance, apiTokenInstance);
  console.log(response);
  return response;
});

export const sendMessageThunk = createAsyncThunk<
  SendMessageResponse,
  SendMessageArgs
>(
  'chat/sendMessage',
  async ({ idInstance, apiTokenInstance, chatId, message }) => {
    const response = await sendMessage(
      idInstance,
      apiTokenInstance,
      chatId,
      message
    );
    return response;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.loading = false;
        const message = action.payload.message;
        state.messages.push(`Я: ${message}`);
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send message';
      })
      .addCase(setUserDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setUserDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      });
  },
});

export default chatSlice.reducer;
