import { Box, Button, TextField } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { sendMessageThunk } from '../../store/slices/chatSlice';

export const MessageForm: React.FC = () => {
  const { activeChat } = useAppSelector((state) => state.chats);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const isValid = () => message.length > 0 && activeChat;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(sendMessageThunk({ chatId: activeChat!, message }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', alignItems: 'center', gap: 1, m: 1 }}
    >
      <Button
        variant="contained"
        endIcon={<AddCircleIcon />}
        aria-label="add"
        type="submit"
        disabled={!isValid()}
      >
        Send
      </Button>
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
