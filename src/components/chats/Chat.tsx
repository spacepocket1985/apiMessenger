import FaceIcon from '@mui/icons-material/Face';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { setActiveChat } from '../../store/slices/chatSlice';

export const Chat: React.FC<{ phoneNumber: string }> = ({ phoneNumber }) => {
  const dispatch = useAppDispatch();
  const { activeChat } = useAppSelector((state) => state.chats);
  const handleClick = (chatId: string) => dispatch(setActiveChat(chatId));

  return (
    <ListItem
      onClick={() => handleClick(phoneNumber)}
      sx={{
        cursor: 'pointer',
        border: activeChat === phoneNumber ? '2px solid #2e7d32' : 'none',
        borderRadius: 5,
        mb: 1.5,
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: '#2e7d32' }}>
          <FaceIcon fontSize="large" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={phoneNumber.slice(0, phoneNumber.length - 5)} />
    </ListItem>
  );
};
