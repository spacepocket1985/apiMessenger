import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { sendMessage } from '../../service/greenApi2';
import {
  getChatHistory,
  getStateInstance,
  getUserData,
} from '../../service/greenApi';
import { MessageType } from '../../types';

type SendMessageResponse = {
  message: string;
  status: string;
  timestamp: string;
};

type ChatState = {
  activeChat: string | null;
  messages: MessageType[];
  chats: string[];
  loading: boolean;
  error: string | null;
};

const initialState: ChatState = {
  activeChat: null,
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

export const setCredentialThunk = createAsyncThunk<
  string,
  { idInstance: string; apiTokenInstance: string }
>('chat/setCredential', async ({ idInstance, apiTokenInstance }) => {
  return await getStateInstance(idInstance, apiTokenInstance);
});

export const setUserDataThunk = createAsyncThunk<string[]>(
  'chat/setUserData',
  async () => {
    const response = await getUserData();

    return response;
  }
);

export const getChatHistoryThunk = createAsyncThunk<MessageType[], string>(
  'chat/getChatHistory',
  async (id) => {
    const response = await getChatHistory(id);
    return response;
  }
);

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
  reducers: {
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(sendMessageThunk.fulfilled, (state, action) => {
      //   state.loading = false;
      //   const message = action.payload.message;
      //   state.messages.push(`Я: ${message}`);
      // })
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
      })
      .addCase(getChatHistoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatHistoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getChatHistoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed fetch messages';
      });
  },
});

export default chatSlice.reducer;
export const { setActiveChat } = chatSlice.actions;
