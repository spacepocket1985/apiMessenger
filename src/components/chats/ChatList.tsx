import { Box, Button, List, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
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
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        gap={2}
        sx={{ bgcolor: '#2e7d32' }}
      >
        <Typography
          sx={{ textAlign: 'left', p: 2, color: '#fff' }}
          component="h6"
          variant="h6"
        >
          ChatList
        </Typography>
        <Button
          variant="outlined"
          endIcon={<ArticleIcon />}
          sx={{ color: '#fff' }}
          color="success"
        >
          GreenApi
        </Button>
      </Box>
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
