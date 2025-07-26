import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotService } from './bot.service';
import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from '../candidates/entities/candidate.schema';
import { Model } from 'mongoose';
import { Statuses } from 'src/enums/enums';
import { MessageService } from './message.service';

@Update()
export class BotUpdate {
  constructor(
    private readonly botService: BotService,
    private readonly messageService: MessageService,
    @InjectModel(Candidate.name)
    private readonly cadidateRepo: Model<Candidate>,
  ) {}
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

    const lateCandidate = await this.cadidateRepo.findOne({
      'personalInfo.tgUsername': username.toLowerCase(),
    });
    await this.botService.addTelegramId(username, tgId);

    if (lateCandidate) {
      if (lateCandidate.status === Statuses.reviewing)
        return this.messageService.reviewingMessageForCandidate(lateCandidate);
      if (lateCandidate.status === Statuses.rejected)
        return this.messageService.rejectedMessageForCandidate(lateCandidate);
      if (lateCandidate.status === Statuses.accepted)
        return this.messageService.acceptedMessageForCandidate(lateCandidate);
    }
  }
}
