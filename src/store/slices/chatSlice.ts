import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
  string,
  { chatId: string; message: string }
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
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state) => {
        state.loading = false;
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

      .addCase(checkWhatsappThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed add phone number';
      })
      .addCase(checkWhatsappThunk.fulfilled, (state, action) => {
        if (!state.chats.find((chat) => chat === action.payload))
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
      })
      .addCase(getMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessageThunk.fulfilled, (state, action) => {
        const message = action.payload;
        const messageExists = state.messages.find(
          (msg) => msg.idMessage === message.idMessage
        );
        const chatIdIndex = state.chats.findIndex(
          (chat) => chat === action.payload.chatId
        );
        if (chatIdIndex === -1) state.chats.push(action.payload.chatId);
        if (state.activeChat === action.payload.chatId)
          if (!messageExists) {
            state.messages.unshift(message);
          }
        state.loading = false;
      });
  },
});

export default chatSlice.reducer;
export const { setActiveChat, clearError, setError } = chatSlice.actions;
