import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  getMessageThunk,
  sendMessageThunk,
} from '../../store/slices/chatSlice';

export const MessageForm: React.FC = () => {
  const { activeChat } = useAppSelector((state) => state.chats);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const isValid = () => message.length > 0 && activeChat;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await dispatch(
      sendMessageThunk({ chatId: activeChat!, message })
    );
    if (result.meta.requestStatus === 'fulfilled') {
      await dispatch(
        getMessageThunk({
          idMessage: result.payload as string,
          chatId: activeChat!,
        })
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', alignItems: 'center', gap: 1, m: 1 }}
    >
      <IconButton
        aria-label="add"
        type="submit"
        disabled={!isValid()}
        size="large"
      >
        <AddIcon />
      </IconButton>
      <TextField
        placeholder={'Write here your message'}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        autoComplete=""
        size="small"
        required
        sx={{ flexGrow: 1, backgroundColor: '#fff' }}
      />
    </Box>
  );
};
