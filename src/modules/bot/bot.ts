import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotService } from './bot.service';
import { BadRequestException } from '@nestjs/common';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply(
      `👋👋👋Salom ${ctx.from?.username?.toLowerCase()}, \n siz endi bu bot orqli o'z candidate formangiz haqida bildirishnomalar qabul qilasiz`,
    );
    const tgId = ctx.from?.id;
    const username = ctx.from?.username;
    if (!username) throw new BadRequestException('username must have');
    if (tgId === undefined)
      throw new BadRequestException('telegram id must have');
    return this.botService.addTelegramId(username, tgId);
  }
}
