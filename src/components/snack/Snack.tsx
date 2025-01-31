import Stack from '@mui/joy/Stack';

import Snackbar from '@mui/joy/Snackbar';
import React from 'react';

type SnackColorType = 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
type SnackVariantType = 'outlined' | 'plain' | 'soft' | 'solid';

export const Snack: React.FC<{
  color: SnackColorType;
  variant: SnackVariantType;
  children: React.ReactNode;
}> = ({ color, variant, children }) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        variant={variant}
        color={color}
        onClose={(_, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
        }}
      >
        {children}
      </Snackbar>
    </Stack>
  );
};
