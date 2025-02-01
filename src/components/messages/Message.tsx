import { Box, Typography, Chip } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import { MessageType } from '../../types';
import { getDate } from '../../utils/getDate';

export const Message: React.FC<{ msg: MessageType }> = ({ msg }) => {
  const msgType = msg.type === 'outgoing' ? 'primary' : 'success';

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
          maxWidth: '350px',
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
