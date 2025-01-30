import FaceIcon from '@mui/icons-material/Face';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

export const Chat: React.FC<{ phoneNumber: string }> = ({ phoneNumber }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: '#00c853' }}>
          <FaceIcon fontSize="large" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={phoneNumber.slice(0, phoneNumber.length - 5)} />
    </ListItem>
  );
};
