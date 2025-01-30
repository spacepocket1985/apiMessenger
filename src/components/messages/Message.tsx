import { Box, Chip } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import { MessageType } from '../../types';

export const Message: React.FC<{ msg: MessageType }> = ({ msg }) => {
  const msgType = msg.type === 'outgoing' ? 'primary' : 'success';
  const getDate = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);

    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[date.getMonth()]; // Месяц на английском
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}.${month}-${hours}:${minutes}`;
    return formattedDate;
  };
  return (
    <Box
      display="flex"
      justifyContent={msg.type === 'outgoing' ? 'flex-end' : 'flex-start'}
      mb={0.5}
    >
      <Chip
        icon={<FaceIcon />}
        label={msg.textMessage}
        color={msgType}
        variant="filled"
        sx={{ mr: 0.5 }}
      />
      <Chip
        label={getDate(msg.timestamp)}
        color={msgType}
        variant="outlined"
        size="small"
      />
    </Box>
  );
};
