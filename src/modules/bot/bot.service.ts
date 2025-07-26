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
import { PersonalInfo } from 'src/types/object.types';
import { Employee } from '../employee/entities/employee.schema';
import { Statuses } from 'src/enums/enums';
import { MessageService } from './message.service';
import { NotFoundError } from 'rxjs';
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
    await this.bot.telegram.sendMessage(chatId, message, {
      parse_mode: 'HTML',
    });
  }

  async addTelegramId(tgUsername: string, telegramId: number) {
    try {
      await this.candidateRepo.findOneAndUpdate(
        {
          'personalInfo.0.tgUsername': tgUsername,
        },
        { telegramId },
      );
      await this.employeeRepo.findOneAndUpdate(
        {
          'personalInfo.0.tgUsername': tgUsername,
        },
        { telegramId },
      );
    } catch (error) {
      throw new BadRequestException(
        'iltimos formdatagagi telegram akkauntingizdan foidalaning',
      );
    }
  }

  async updateStatusToReviewing(id: string) {
    const updated = await this.candidateRepo.findByIdAndUpdate(id, {
      status: Statuses.reviewing,
    });
    if (!updated) throw new BadRequestException('not updated');
    await this.messageService.reviewingMessageForCandidate(updated);
    return updated;
  }
}
