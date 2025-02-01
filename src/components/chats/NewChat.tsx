import { Box, Button, TextField } from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/storeHooks';
import { checkWhatsappThunk } from '../../store/slices/chatSlice';

export const NewChat: React.FC = () => {
  const [phone, setPhone] = useState('');
  const isValid = () => phone.length > 6;

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(checkWhatsappThunk(String(phone)));
    setPhone('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', alignItems: 'center', gap: 1, m: 1 }}
    >
      <Button
        variant="contained"
        color="success"
        endIcon={<PhoneInTalkIcon />}
        aria-label="add"
        type="submit"
        disabled={!isValid()}
      >
        Add
      </Button>
      <TextField
        placeholder={'Add phone number'}
        type="number"
        value={phone}
        onChange={(e) => setPhone(e.currentTarget.value)}
        autoComplete=""
        size="small"
        required
        sx={{ flexGrow: 1, backgroundColor: '#fff' }}
      />
    </Box>
  );
};
