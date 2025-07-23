import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot';
import { BotService } from './bot.service';
import { MessageService } from './message.service';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN || '',
    }),
  ],
  controllers: [],
  providers: [BotUpdate, BotService, MessageService],
  exports: [BotService, MessageService],
})
export class BotModule {}
