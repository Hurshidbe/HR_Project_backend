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
  Delete,
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
import { Sex } from 'src/enums/enums';

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
    const filter: any = {};
    if (query.fullName)
      filter.fullName = { $regex: query.fullName, $options: 'i' };
    if (query.sex) filter.sex = query.sex;
    if (query.status) filter.status = query.status;
    if (query.region) filter.region = query.region;
    if (query.startDate || query.endDate) {
      filter.createdAt = {};
      if (query.startDate) {
        filter.createdAt.$gte = new Date(query.startDate);
      }
      if (query.endDate) {
        filter.createdAt.$lte = new Date(query.endDate);
      }
    }
    try {
      const data = await this.candidatesService.getAll(filter);
      response = new CustomBackendResponse(true, data);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @UseGuards(AuthGuard)
  @Patch(':id/reject')
  async reject(@Param('id') id: string) {
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
  async accept(@Param('id') id: string, @Body() dto: AcceptCandidateDto) {
    let response: CustomBackendResponse;
    try {
      const accepted = await this.candidatesService.acceptCandidate(
        id,
        dto.department,
        dto.position,
        dto.salary || 0,
        dto.employeeStatus,
      );
      const candidate = await this.candidatesService.findOne(id);
      if (candidate)
        await this.messageService.acceptedMessageForCandidate(candidate);
      await this.candidatesService.delete(id);
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    let response: CustomBackendResponse;
    try {
      const rejected = await this.candidatesService.rejectCandidate(id);
      response = new CustomBackendResponse(true, rejected);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }
}
