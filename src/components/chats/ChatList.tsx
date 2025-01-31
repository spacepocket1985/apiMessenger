import { List, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/storeHooks';
import { Chat } from './Chat';
import { NewChat } from './NewChat';

export const ChatList: React.FC = () => {
  const { chats } = useAppSelector((state) => state.chats);
  const renderChats = chats.map((chat) => (
    <Chat key={chat} phoneNumber={chat} />
  ));
  return (
    <>
      <Typography
        sx={{ textAlign: 'left', p: 2, bgcolor: '#2e7d32', color: '#fff' }}
        component="h6"
        variant="h6"
      >
        Chat list
      </Typography>
      <List
        sx={{
          width: '95%',
          bgcolor: 'background.paper',
          m: 'auto',
        }}
      >
        {renderChats}
      </List>

      <NewChat />
    </>
  );
};
