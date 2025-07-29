import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { measureMemory } from 'vm';
import { Candidate } from '../candidates/entities/candidate.schema';
import { Model } from 'mongoose';
import { Employee } from '../employee/entities/employee.schema';
import { MessageService } from './message.service';
import { NotFoundError } from 'rxjs';
import { CandidateStatuses } from 'src/enums/enums';
@Injectable()
export class BotService {
  constructor(
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService,
    @InjectBot() private readonly bot: Telegraf,
    @InjectModel(Candidate.name)
    private readonly candidateRepo: Model<Candidate>,
    @InjectModel(Employee.name) private readonly employeeRepo: Model<Employee>,
  ) {}

  async sendNotify(message: string, chatId) {
    try {
      await this.bot.telegram.sendMessage(chatId, message, {
        parse_mode: 'HTML',
      });
    } catch (error) {}
  }

  async addTelegramId(tgUsername: string, telegramId: number) {
    try {
      await this.candidateRepo.findOneAndUpdate(
        {
          tgUsername,
        },
        { telegramId },
      );
      await this.employeeRepo.findOneAndUpdate(
        {
          tgUsername,
        },
        { telegramId },
      );
    } catch (error) {}
  }

  async updateStatusToReviewing(id: string) {
    const updated = await this.candidateRepo.findByIdAndUpdate(id, {
      status: CandidateStatuses.reviewing,
    });
    if (!updated) throw new BadRequestException('not updated');
    await this.messageService.reviewingMessageForCandidate(updated);
    return updated;
  }
}
