import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { getChatHistoryThunk } from '../../store/slices/chatSlice';
import { Message } from './Message';
import { Container } from '@mui/material';

export const MessagesList: React.FC = () => {
  const { activeChat, messages } = useAppSelector((state) => state.chats);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (activeChat) dispatch(getChatHistoryThunk(activeChat));
  }, [activeChat, dispatch]);
  const renderMessages = messages.map((msg) => (
    <Message msg={msg} key={msg.idMessage} />
  ));
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {activeChat && renderMessages.reverse()}
    </Container>
  );
};
