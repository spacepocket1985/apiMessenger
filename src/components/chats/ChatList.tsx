import { List, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/storeHooks';
import { Chat } from './Chat';

export const ChatList: React.FC = () => {
  const { chats } = useAppSelector((state) => state.chats);
  const renderChats = chats.map((chat) => (
    <Chat key={chat} phoneNumber={chat} />
  ));
  return (
    <>
      <Typography sx={{ textAlign: 'left', p: 2 }} component="h6" variant="h6">
        Chart list
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {renderChats}
      </List>
    </>
  );
};
