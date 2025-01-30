import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';

import { ChatList } from '../components/chats/ChatList';
import { MessageForm } from '../components/messages/MessageForm';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/storeHooks';

import { setUserDataThunk } from '../store/slices/chatSlice';
import { MessagesList } from '../components/messages/MessagesList';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setUserDataThunk());
  }, [dispatch]);
  return (
    <Paper sx={{ width: '80%', margin: 'auto', mt: 3 }}>
      <Grid container spacing={1}>
        <Grid size={3}>
          <ChatList />
        </Grid>
        <Grid
          size={9}
          sx={{
            height: '90vh',
            bgcolor: '#eeeeee',
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            overflowY: 'scroll',
          }}
        >
          <MessagesList />
          <MessageForm />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Main;
