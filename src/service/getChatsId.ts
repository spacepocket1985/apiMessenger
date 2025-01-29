const API_URL = 'https://7105.api.greenapi.com';
const idInstance = '7105182998';
const apiTokenInstance = '79d517639c574bbba2b5578e2c2b501b15d5cec40f744be3be';

type MessageType = {
  type: 'outgoing' | 'incoming';
  idMessage: string;
  timestamp: number;
  typeMessage: 'textMessage' | 'imageMessage' | 'videoMessage';
  chatId: string;
  textMessage: string;
  statusMessage: 'read' | 'unread' | 'delivered';
  sendByApi: boolean;
  deletedMessageId: string;
  editedMessageId: string;
  isEdited: boolean;
  isDeleted: boolean;
};

enum Messages {
  Incoming = `lastIncomingMessages`,
  Outgoing = 'lastOutgoingMessages',
}

const fetchMessages = async (messageType: Messages) => {
  const response = await fetch(
    `${API_URL}/waInstance${idInstance}/${messageType}/${apiTokenInstance}?minutes=1440`
  );

  if (!response.ok) throw new Error('Fetch failed');
  return response.json();
};

export const getChatsId = async () => {
  const chatIdsSet = new Set<string>();

  try {
    const incomingMessages = await fetchMessages(Messages.Incoming);
    incomingMessages.forEach((message: MessageType) =>
      chatIdsSet.add(message.chatId)
    );

    // const outgoingMessages = await fetchMessages(Messages.Outgoing);
    // outgoingMessages.forEach((message: MessageType) =>
    //   chatIdsSet.add(message.chatId)
    // );

    return Array.from(chatIdsSet);
  } catch (error) {
    console.error('Error fetching chat IDs:', error);
    throw error;
  }
};
