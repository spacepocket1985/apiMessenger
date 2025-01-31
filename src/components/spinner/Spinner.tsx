import { CircularProgress, Box } from '@mui/material';
export const Spinner: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size="5rem" />
    </Box>
  );
};
