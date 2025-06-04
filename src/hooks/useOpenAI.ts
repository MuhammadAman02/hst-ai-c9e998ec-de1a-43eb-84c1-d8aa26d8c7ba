import OpenAI from 'openai';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const useOpenAI = (apiKey: string) => {
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  console.log('OpenAI hook initialized');

  const sendMessage = async (message: string, previousMessages: Message[]): Promise<string> => {
    console.log('Sending message to OpenAI API:', message);
    console.log('Previous messages count:', previousMessages.length);

    try {
      const messages = [
        {
          role: 'system' as const,
          content: 'You are a helpful AI assistant. Provide clear, concise, and helpful responses.'
        },
        ...previousMessages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })),
        {
          role: 'user' as const,
          content: message
        }
      ];

      console.log('Calling OpenAI API with', messages.length, 'messages');

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      console.log('OpenAI API response received, length:', response.length);
      
      return response;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to get response from OpenAI. Please check your API key and try again.');
    }
  };

  return { sendMessage };
};