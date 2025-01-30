export type MessageType = {
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

export enum Method {
  Incoming = `lastIncomingMessages`,
  Outgoing = 'lastOutgoingMessages',
  StateInstance = 'getStateInstance',
  GetChatHistory = 'getChatHistory',
}
