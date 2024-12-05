import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class AppService {
  private openai: OpenAI;
  private logger = new Logger(AppService.name);

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async chat(
    systemPrompt: string,
    history: { role: string; content: string }[],
  ) {
    try {
      const messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...history.map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
      ];
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7,
      });

      // Add AI response to chat
      const aiResponse = completion.choices[0].message.content;
      this.logger.log(aiResponse);
      return {
        message: aiResponse,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        message: 'An error occurred while processing your request.',
      };
    }
  }
}
