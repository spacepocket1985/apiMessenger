const API_URL = 'https://7105.api.greenapi.com';

export const sendMessage = async (
  idInstance: string,
  apiTokenInstance: string,
  chatId: string,
  message: string
) => {
  const response = await fetch(
    `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: `${chatId}@c.us`,
        message: message,
      }),
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || 'Error sending message');
  }

  return await response.json();
};

export const setupWebhook = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  const response = await fetch(
    `${API_URL}/waInstance${idInstance}/setSettings/${apiTokenInstance}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webhookUrl: '',
        outgoingWebhook: 'yes',
        stateWebhook: 'yes',
        incomingWebhook: 'yes',
      }),
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || 'Error setting up webhook');
  }

  return await response.json();
};
