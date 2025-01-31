import { Method, MessageType } from '../types';
import { getAuthData, setAuthData } from '../utils/localStorageActions';

export const makeApiURL = (method: Method, id?: string, apiToken?: string) => {
  const [idLS, apiTokenLS] = getAuthData();
  const idInstance = id || idLS!;
  const apiTokenInstance = apiToken || apiTokenLS;

  const url = `https://${idInstance.slice(0, 4)}.api.greenapi.com/waInstance${idInstance}/${method}/${apiTokenInstance}`;
  return url;
};

const fetchMessages = async (method: Method) => {
  const API_URL = makeApiURL(method);
  const response = await fetch(`${API_URL}?minutes=1440`);

  if (!response.ok) throw new Error('Fetch failed');
  return response.json();
};

export const getUserData = async () => {
  const chatIdsSet = new Set<string>();

  try {
    const [incomingMessages, outgoingMessages] = await Promise.all([
      fetchMessages(Method.Incoming),
      fetchMessages(Method.Outgoing),
    ]);

    incomingMessages.forEach((message: MessageType) =>
      chatIdsSet.add(message.chatId)
    );

    outgoingMessages.forEach((message: MessageType) =>
      chatIdsSet.add(message.chatId)
    );

    return Array.from(chatIdsSet);
  } catch (error) {
    throw new Error(`Error fetching chat IDs:', ${error}`);
  }
};

export const getStateInstance = async (
  idInstance: string,
  apiTokenInstance: string
): Promise<string> => {
  const API_URL = makeApiURL(
    Method.StateInstance,
    idInstance,
    apiTokenInstance
  );
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error get instance status');
  }
  const data = (await response.json()) as { stateInstance: string };
  if (data.stateInstance === 'authorized')
    setAuthData(idInstance, apiTokenInstance);
  else throw new Error('Authorization error, try again!');
  return data.stateInstance;
};

export const getChatHistory = async (
  chatId: string
): Promise<MessageType[]> => {
  const API_URL = makeApiURL(Method.GetChatHistory);
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatId,
      count: 20,
    }),
  });
  if (!response.ok) {
    throw new Error('Error get chat history');
  }
  const data: MessageType[] = await response.json();

  return data;
};

export const getMessage = async (
  chatId: string,
  idMessage: string
): Promise<MessageType> => {
  const API_URL = makeApiURL(Method.GetMessage);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatId,
      idMessage,
    }),
  });

  if (!response.ok) {
    throw new Error('Error get message');
  }

  const data: MessageType = await response.json();
  console.log('data ->', data);

  return data;
};

export const sendMessage = async (chatId: string, message: string) => {
  const API_URL = makeApiURL(Method.SendMessage);
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatId,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error('Error sending message');
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { idMessage } = (await response.json()) as {
    idMessage: string;
  };

  const msg = await getMessage(chatId, idMessage);

  return msg;
};

export const checkWhatsapp = async (phoneNumber: string) => {
  const API_URL = makeApiURL(Method.CheckWhatsapp);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber }),
  });

  if (!response.ok) {
    throw new Error('WhatsApp is not installed on this phone number');
  }
  const { existsWhatsapp } = (await response.json()) as {
    existsWhatsapp: boolean;
  };
  console.log('existsWhatsapp ', existsWhatsapp);
  if (!existsWhatsapp)
    throw new Error('WhatsApp is not installed on this phone number');

  return `${phoneNumber}@c.us`;
};
