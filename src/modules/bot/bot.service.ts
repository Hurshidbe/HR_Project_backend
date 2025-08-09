import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Candidate } from '../candidates/entities/candidate.schema';
import { Model } from 'mongoose';
import { Employee } from '../employee/entities/employee.schema';
import { MessageService } from './message.service';
import { CandidateStatus } from 'src/enums/enums';

/**
 * Service for managing Telegram bot operations
 */
@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService,
    @InjectBot() private readonly bot: Telegraf,
    @InjectModel(Candidate.name)
    private readonly candidateRepository: Model<Candidate>,
    @InjectModel(Employee.name)
    private readonly employeeRepository: Model<Employee>,
  ) {}

  /**
   * Send notification message to Telegram chat
   */
  async sendNotify(message: string, chatId: number | string): Promise<void> {
    try {
      this.logger.log(`Sending notification to chat ${chatId}`);

      await this.bot.telegram.sendMessage(chatId, message, {
        parse_mode: 'HTML',
      });

      this.logger.log(`Notification sent successfully to chat ${chatId}`);
    } catch (error) {
      this.logger.error(
        `Failed to send notification to chat ${chatId}: ${error.message}`,
        error.stack,
      );
      // Don't throw error to prevent breaking the main flow
    }
  }

  /**
   * Add Telegram ID to candidate and employee records
   */
  async addTelegramId(tgUsername: string, telegramId: number): Promise<void> {
    try {
      this.logger.log(
        `Adding Telegram ID ${telegramId} for username ${tgUsername}`,
      );

      // Update candidate record
      const candidateUpdate = await this.candidateRepository.findOneAndUpdate(
        { tgUsername },
        { telegramId },
        { new: true },
      );

      // Update employee record
      const employeeUpdate = await this.employeeRepository.findOneAndUpdate(
        { tgUsername },
        { telegramId },
        { new: true },
      );

      this.logger.log(
        `Telegram ID updated - Candidate: ${!!candidateUpdate}, Employee: ${!!employeeUpdate}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to add Telegram ID for ${tgUsername}: ${error.message}`,
        error.stack,
      );
      // Don't throw error to prevent breaking the main flow
    }
  }

  /**
   * Update candidate status to reviewing and send notification
   */
  async updateStatusToReviewing(id: string): Promise<Candidate> {
    try {
      this.logger.log(`Updating candidate ${id} status to reviewing`);

      const updated = await this.candidateRepository.findByIdAndUpdate(
        id,
        { status: CandidateStatus.REVIEWING },
        { new: true },
      );

      if (!updated) {
        throw new NotFoundException('Candidate not found');
      }

      // Send notification to candidate
      try {
        await this.messageService.reviewingMessageForCandidate(updated);
      } catch (notificationError) {
        this.logger.warn(
          `Failed to send reviewing notification: ${notificationError.message}`,
        );
        // Continue execution even if notification fails
      }

      this.logger.log(
        `Candidate ${id} status updated to reviewing successfully`,
      );
      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to update candidate status: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to update candidate status');
    }
  }

  /**
   * Check if bot is connected and working
   */
  async checkBotHealth(): Promise<boolean> {
    try {
      const botInfo = await this.bot.telegram.getMe();
      this.logger.log(`Bot health check passed: ${botInfo.username}`);
      return true;
    } catch (error) {
      this.logger.error(
        `Bot health check failed: ${error.message}`,
        error.stack,
      );
      return false;
    }
  }

  /**
   * Get bot information
   */
  async getBotInfo(): Promise<any> {
    try {
      return await this.bot.telegram.getMe();
    } catch (error) {
      this.logger.error(
        `Failed to get bot info: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to get bot information');
    }
  }
}
