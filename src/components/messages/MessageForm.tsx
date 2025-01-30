import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

export const MessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const isValid = () => message.length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(message);
    setMessage('');
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
        onChange={(e) => setMessage(e.currentTarget.value.trim())}
        autoComplete=""
        size="small"
        required
        sx={{ flexGrow: 1, backgroundColor: '#fff' }}
      />
    </Box>
  );
};
