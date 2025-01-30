import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import { Wrapper } from '../components/wrapper/Wrapper';
import { useAppDispatch } from '../hooks/storeHooks';
import { RoutePaths } from '../routes/routePaths';
import { setUserDataThunk } from '../store/slices/chatSlice';

const Login: React.FC = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isValid = () => idInstance.length > 0 && apiTokenInstance.length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginResult = await dispatch(
      setUserDataThunk({ idInstance, apiTokenInstance })
    );
    if (loginResult.meta.requestStatus === 'fulfilled') {
      navigate(RoutePaths.MAIN);
    }
  };

  return (
    <Wrapper title="Login">
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
        <Button type="submit" variant="contained" disabled={!isValid()}>
          Submit
        </Button>
      </Box>
    </Wrapper>
  );
};

export default Login;
