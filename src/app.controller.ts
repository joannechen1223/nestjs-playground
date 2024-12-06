import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  getHealth(): string {
    return 'OK';
  }

  @Post('/chat')
  async chat(
    @Body()
    body: {
      systemPrompt: string;
      history: { role: string; content: string }[];
    },
  ) {
    return this.appService.chat(body.systemPrompt, body.history);
  }
}
