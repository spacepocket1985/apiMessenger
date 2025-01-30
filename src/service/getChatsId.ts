import { Method, MessageType } from '../types';
import { setAuthData } from '../utils/localStorageActions';

const API_URL = 'api.greenapi.com';
//const idInstance = '7105182998';
//const apiTokenInstance = '79d517639c574bbba2b5578e2c2b501b15d5cec40f744be3be';

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

export const getChatsId = async (
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
