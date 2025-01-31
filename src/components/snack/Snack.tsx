import React from 'react';
import Stack from '@mui/joy/Stack';
import Snackbar, { SnackbarCloseReason } from '@mui/joy/Snackbar';

import { useAppDispatch } from '../../hooks/storeHooks';
import { clearError } from '../../store/slices/chatSlice';

type SnackColorType = 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
type SnackVariantType = 'outlined' | 'plain' | 'soft' | 'solid';

export const Snack: React.FC<{
  color: SnackColorType;
  variant: SnackVariantType;
  children: React.ReactNode;
}> = ({ color, variant, children }) => {
  const [open, setOpen] = React.useState(true);
  const dispatch = useAppDispatch();

  const handleClose = (_: unknown, reason: SnackbarCloseReason) => {
    if (color === 'danger') dispatch(clearError());
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        variant={variant}
        color={color}
        onClose={handleClose}
      >
        {children}
      </Snackbar>
    </Stack>
  );
};
