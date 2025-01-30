import { Method, MessageType } from '../types';
import { setAuthData } from '../utils/localStorageActions';

const API_URL = '.api.greenapi.com';

const fetchMessages = async (
  idInstance: string,
  apiTokenInstance: string,
  message: Method
) => {
  const response = await fetch(
    `https://${idInstance.slice(0, 4)}${API_URL}/waInstance${idInstance}/${message}/${apiTokenInstance}?minutes=1440`
  );

  if (!response.ok) throw new Error('Fetch failed');
  return response.json();
};

export const getUserData = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  const chatIdsSet = new Set<string>();

  try {
    const [incomingMessages, outgoingMessages] = await Promise.all([
      fetchMessages(idInstance, apiTokenInstance, Method.Incoming),
      fetchMessages(idInstance, apiTokenInstance, Method.Outgoing),
    ]);

    incomingMessages.forEach((message: MessageType) =>
      chatIdsSet.add(message.chatId)
    );

    outgoingMessages.forEach((message: MessageType) =>
      chatIdsSet.add(message.chatId)
    );
    setAuthData(idInstance, apiTokenInstance);

    return Array.from(chatIdsSet);
  } catch (error) {
    console.error('Error fetching chat IDs:', error);
    throw error;
  }
};
