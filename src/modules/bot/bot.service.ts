import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { measureMemory } from 'vm';
@Injectable()
export class BotService {
  constructor(@InjectBot() private readonly bot: Telegraf) {}

  async sendNotify(message: string) {
    const chatId = process.env.ADMIN_TG_ID || 'yoq';
    await this.bot.telegram.sendMessage(chatId, message, {
      parse_mode: 'HTML',
    });
  }
}
