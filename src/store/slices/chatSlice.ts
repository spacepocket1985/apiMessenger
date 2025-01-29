import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { sendMessage, setupWebhook } from '../../service/greenApi';

type SendMessageResponse = {
  message: string;
  status: string;
  timestamp: string;
};

type ChatState = {
  idInstance: string;
  apiTokenInstance: string;
  messages: string[];
  loading: boolean;
  error: string | null;
};

const initialState: ChatState = {
  idInstance: '',
  apiTokenInstance: '',
  messages: [],
  loading: false,
  error: null,
};

type SendMessageArgs = {
  idInstance: string;
  apiTokenInstance: string;
  chatId: string;
  message: string;
};

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

export const setupWebhookThunk = createAsyncThunk<
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void,
  { idInstance: string; apiTokenInstance: string }
>('chat/setupWebhook', async ({ idInstance, apiTokenInstance }) => {
  await setupWebhook(idInstance, apiTokenInstance);
});

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ idInstance: string; apiTokenInstance: string }>
    ) {
      const { idInstance, apiTokenInstance } = action.payload;
      state.idInstance = idInstance;
      state.apiTokenInstance = apiTokenInstance;
    },
    addMessage(state, action: PayloadAction<string>) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
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
        const message = action.payload.message;
        state.messages.push(`Я: ${message}`);
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send message';
      });
  },
});

export const { setCredentials, addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
