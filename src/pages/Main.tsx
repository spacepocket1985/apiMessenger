import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';

import { ChatList } from '../components/chats/ChatList';
import { MessageForm } from '../components/messages/MessageForm';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';

import { getMessageThunk, setUserDataThunk } from '../store/slices/chatSlice';
import { MessagesList } from '../components/messages/MessagesList';
import { Snack } from '../components/snack/Snack';
import { deleteNotification, receiveNotification } from '../service/greenApi';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.chats);
  useEffect(() => {
    dispatch(setUserDataThunk());
  }, [dispatch]);

  useEffect(() => {
    const startPolling = () => {
      let notificationPolling: number | null = null;

      const fetchNotifications = async () => {
        try {
          const notification = await receiveNotification();
          if (notification) {
            await deleteNotification(notification.receiptId);
            const idMessage = notification.body.idMessage;
            const chatId = notification.body.senderData.chatId;
            await dispatch(getMessageThunk({ chatId, idMessage }));
          }
        } catch (error) {
          console.error('Ошибка при получении уведомления:', error);
        }
      };

      notificationPolling = setInterval(fetchNotifications, 10000);

      return () => {
        if (notificationPolling) {
          clearInterval(notificationPolling);
        }
      };
    };

    startPolling();
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
          }}
        >
          <MessagesList />
          <MessageForm />
        </Grid>
      </Grid>
      {error && (
        <Snack color="danger" variant="solid">
          {error}
        </Snack>
      )}
    </Paper>
  );
};

export default Main;
