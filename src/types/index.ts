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
  SendMessage = 'sendMessage',
  GetMessage = 'getMessage',
  CheckWhatsapp = 'checkWhatsapp',
  ReceiveNotification = 'receiveNotification',
  DeleteNotification = 'deleteNotification',
}

export type NotificationType = {
  receiptId: number;
  body: {
    typeWebhook: string;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      chatName: string;
      sender: string;
      senderName: string;
      senderContactName: string;
    };
    messageData: {
      typeMessage: string;
      extendedTextMessageData: {
        text: string;
        description: string;
        title: string;
        previewType: string;
        jpegThumbnail: string;
        forwardingScore: number;
        isForwarded: boolean;
      };
    };
  };
};
