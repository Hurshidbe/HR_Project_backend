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
import { CustomBackendResponse } from 'src/interceptors/backend.response';
import { EmployeeService } from '../employee/employee.service';

import { MessageService } from '../bot/message.service';
import { BotService } from '../bot/bot.service';
import { RoleGuard } from 'src/guards/role.guard';
import { Employee } from '../employee/entities/employee.schema';
import { AcceptCandidateDto } from './dto/candidate.dtos';
import { CreateCandidateDto } from './dto/main.candidate.dto';

@Controller('api/v1/candidates')
export class CandidatesController {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly messageService: MessageService,
    private readonly botService: BotService,
  ) {}

  @Post()
  async create(@Body() data: CreateCandidateDto) {
    let response: CustomBackendResponse;
    try {
      const savedData = await this.candidatesService.create(data);
      await this.messageService.newCandidateMessageForUser(data);
      response = new CustomBackendResponse(true, savedData);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: any) {
    let response: CustomBackendResponse;
    const filter: Partial<Candidate> = {};

    try {
      const data = await this.candidatesService.getAll(query);
      response = new CustomBackendResponse(true, data);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @UseGuards(AuthGuard)
  @Patch(':id/reject')
  async rejectCandidate(@Param('id') id: string) {
    let response: CustomBackendResponse;
    try {
      const rejected = await this.candidatesService.rejectCandidate(id);
      const tgIdExist = rejected?.telegramId;
      if (tgIdExist)
        await this.messageService.rejectedMessageForCandidate(
          rejected as Candidate,
        );
      response = new CustomBackendResponse(true, rejected);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @UseGuards(AuthGuard)
  @Patch(':id/accept')
  async acceptCandidate(
    @Param('id') id: string,
    @Body() dto: AcceptCandidateDto,
  ) {
    let response: CustomBackendResponse;
    try {
      const accepted = await this.candidatesService.acceptCandidate(
        id,
        dto.department,
        dto.position,
        dto.salary,
        dto.employeeStatus,
      );
      const candidate = await this.candidatesService.findOne(id);
      if (candidate)
        await this.messageService.acceptedMessageForCandidate(candidate);
      response = new CustomBackendResponse(true, { accepted });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  async oneCandidate(@Param('id') id: string) {
    let response: CustomBackendResponse;
    try {
      const updated = await this.botService.updateStatusToReviewing(id);
      response = new CustomBackendResponse(true, { updated });
    } catch (error) {
      response = new CustomBackendResponse(false, [error.message]);
    }
    return response;
  }
}
