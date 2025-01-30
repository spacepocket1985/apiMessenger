import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';

import { ChatList } from '../components/chats/ChatList';
import { MessageForm } from '../components/messages/MessageForm';

const Main: React.FC = () => {
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
          }}
        >
          <MessageForm />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Main;
