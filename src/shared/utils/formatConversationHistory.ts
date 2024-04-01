export const formatConversationHistory = (messages: string[]) => {
  return messages
    .map((message, i) => (i % 2 === 0 ? `Human: ${message}` : `AI: ${message}`))
    .join('\n');
};
