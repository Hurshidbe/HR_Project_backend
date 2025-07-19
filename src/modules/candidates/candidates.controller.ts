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
import { dynamicCloudinaryStorage } from 'src/interceptors/cloudinary.config';
import { AuthGuard } from 'src/guards/auth.guard';
import { Candidate } from './entities/candidate.schema';
import { CustomBackendResponse } from 'src/interceptors/backend.response';
import { EmployeeService } from '../employee/employee.service';
import { AcceptEmployeeDto, CreateCandidateDto } from './dto/candidate.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('api/v1/candidates')
export class CandidatesController {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly EmployeeService: EmployeeService,
  ) {}

  @Post()
  @ApiBody({ type: CreateCandidateDto })
  async create(@Body() data: CreateCandidateDto) {
    let response: CustomBackendResponse;
    try {
      const savedData = await this.candidatesService.create(data);
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
  @ApiParam({ name: 'id', required: true, example: '687796739908dcb863a24ebf' })
  async rejectCandidate(@Param('id') id: string) {
    let response: CustomBackendResponse;
    try {
      const rejected = await this.candidatesService.rejectCandidate(id);
      response = new CustomBackendResponse(true, rejected);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @UseGuards(AuthGuard)
  @Patch(':id/accept')
  @ApiParam({ name: 'id', required: true, example: '687796739908dcb863a24ebf' })
  @ApiBody({ type: AcceptEmployeeDto })
  async acceptCandidate(
    @Param('id') id: string,
    @Body() dto: AcceptEmployeeDto,
  ) {
    let response: CustomBackendResponse;
    try {
      const accepted = await this.candidatesService.acceptCandidate(
        id,
        dto.department,
        dto.position,
        dto.salary,
        dto.EmployeeStatus,
      );
      response = new CustomBackendResponse(true, { accepted });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }
}
