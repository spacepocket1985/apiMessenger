import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  checkWhatsapp,
  getChatHistory,
  getMessage,
  getStateInstance,
  getUserData,
  sendMessage,
} from '../../service/greenApi';
import { MessageType } from '../../types';

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
  MessageType,
  { chatId: string; message: string },
  { rejectValue: string }
>('chat/sendMessage', async ({ chatId, message }) => {
  const response = await sendMessage(chatId, message);
  return response;
});

export const getMessageThunk = createAsyncThunk<
  MessageType,
  { chatId: string; idMessage: string }
>('chat/getMessage', async ({ chatId, idMessage }) => {
  const response = await getMessage(chatId, idMessage);
  return response;
});

export const checkWhatsappThunk = createAsyncThunk<string, string>(
  'chat/checkWhatsapp',
  async (phoneNumber) => {
    const response = await checkWhatsapp(phoneNumber);
    return response;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.loading = false;
        const message = action.payload;
        state.messages.unshift(message);
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
      })
      .addCase(checkWhatsappThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed add phone number';
      })
      .addCase(checkWhatsappThunk.fulfilled, (state, action) => {
        state.chats.push(action.payload);
        state.activeChat = action.payload;
      })
      .addCase(setCredentialThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setCredentialThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login error, try again';
      })
      .addCase(setCredentialThunk.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export default chatSlice.reducer;
export const { setActiveChat, clearError } = chatSlice.actions;
