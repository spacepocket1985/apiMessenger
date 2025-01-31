import { Box, Typography, Chip } from '@mui/material';
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
    const month = monthNames[date.getMonth()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}-${hours}:${minutes}`;
  };

  return (
    <Box
      display="flex"
      justifyContent={msg.type === 'outgoing' ? 'flex-end' : 'flex-start'}
      mb={0.5}
    >
      <Box
        display="flex"
        alignItems="center"
        bgcolor={msgType === 'primary' ? 'primary.main' : 'success.main'}
        color="white"
        sx={{
          borderRadius: 4,
          padding: 1,
          maxWidth: '300px',
          overflow: 'hidden',
        }}
      >
        <FaceIcon sx={{ marginRight: 0.5 }} />
        <Typography
          variant="body2"
          sx={{
            whiteSpace: 'normal',
          }}
        >
          {msg.textMessage}
        </Typography>
      </Box>
      <Chip
        label={getDate(msg.timestamp)}
        color={msgType}
        variant="outlined"
        size="small"
      />
    </Box>
  );
};
