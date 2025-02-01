import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Wrapper } from '../components/wrapper/Wrapper';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { RoutePaths } from '../routes/routePaths';
import { setCredentialThunk } from '../store/slices/chatSlice';
import { Snack } from '../components/snack/Snack';
import { Spinner } from '../components/spinner/Spinner';

const Login: React.FC = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading } = useAppSelector((state) => state.chats);
  const isValid = () => idInstance.length > 0 && apiTokenInstance.length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginResult = await dispatch(
      setCredentialThunk({ idInstance, apiTokenInstance })
    );
    if (loginResult.meta.requestStatus === 'fulfilled') {
      navigate(RoutePaths.MAIN);
    }
  };

  const spinnerOrContent = loading ? (
    <Spinner />
  ) : (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '20rem' },
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Id instance"
        type="text"
        value={idInstance}
        onChange={(e) => setIdInstance(e.currentTarget.value.trim())}
        autoComplete=""
        size="small"
        required
      />
      <TextField
        label="Api token instance"
        type="text"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.currentTarget.value.trim())}
        autoComplete=""
        size="small"
        required
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!isValid()}
        color="success"
      >
        Submit
      </Button>
      <Typography sx={{ textAlign: 'center' }}>
        Dont have an account?{' '}
        <Link to={'https://green-api.com/'}>Register.</Link>
      </Typography>
    </Box>
  );
  const isError = error ? (
    <Snack color="danger" variant="solid">
      {error}
    </Snack>
  ) : null;

  return (
    <Wrapper title="Login">
      {spinnerOrContent}
      {isError}
    </Wrapper>
  );
};

export default Login;
