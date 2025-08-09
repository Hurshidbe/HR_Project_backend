import {
  Controller,
  Post,
  Body,
  HttpException,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Get,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CandidatesService } from './candidates.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Candidate } from './entities/candidate.schema';
import { ResponseUtil } from 'src/utils/response.util';
import { MessageService } from '../bot/message.service';
import { BotService } from '../bot/bot.service';
import { RoleGuard } from 'src/guards/role.guard';
import { AcceptCandidateDto } from './dto/candidate.dtos';
import { CreateCandidateDto } from './dto/main.candidate.dto';
import { ApiResponse } from 'src/types/common.types';

@Controller('api/v1/candidates')
export class CandidatesController {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly messageService: MessageService,
    private readonly botService: BotService,
  ) {}

  @Post()
  async create(@Body() data: CreateCandidateDto): Promise<ApiResponse<any>> {
    try {
      const savedData = await this.candidatesService.create(data);
      await this.messageService.newCandidateMessageForUser(data);
      return ResponseUtil.created(savedData, 'Candidate application submitted successfully');
    } catch (error) {
      return ResponseUtil.error(error.message, 'Failed to create candidate');
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: any): Promise<ApiResponse<any>> {
    try {
      const data = await this.candidatesService.getAll(query);
      return ResponseUtil.success(data, 'Candidates retrieved successfully');
    } catch (error) {
      return ResponseUtil.error(error.message, 'Failed to retrieve candidates');
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id/reject')
  async rejectCandidate(@Param('id') id: string): Promise<ApiResponse<any>> {
    try {
      const rejected = await this.candidatesService.rejectCandidate(id);
      
      if (rejected?.telegramId) {
        await this.messageService.rejectedMessageForCandidate(rejected as Candidate);
      }
      
      return ResponseUtil.updated(rejected, 'Candidate rejected successfully');
    } catch (error) {
      return ResponseUtil.error(error.message, 'Failed to reject candidate');
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id/accept')
  async acceptCandidate(
    @Param('id') id: string,
    @Body() dto: AcceptCandidateDto,
  ): Promise<ApiResponse<any>> {
    try {
      const accepted = await this.candidatesService.acceptCandidate(
        id,
        dto.department,
        dto.position,
        dto.salary,
        dto.employeeStatus,
      );
      
      const candidate = await this.candidatesService.findOne(id);
      if (candidate) {
        await this.messageService.acceptedMessageForCandidate(candidate);
      }
      
      return ResponseUtil.updated({ accepted }, 'Candidate accepted successfully');
    } catch (error) {
      return ResponseUtil.error(error.message, 'Failed to accept candidate');
    }
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  async oneCandidate(@Param('id') id: string): Promise<ApiResponse<any>> {
    try {
      const updated = await this.botService.updateStatusToReviewing(id);
      return ResponseUtil.success(updated, 'Candidate status updated to reviewing');
    } catch (error) {
      return ResponseUtil.error(error.message, 'Failed to update candidate status');
    }
  }
}
