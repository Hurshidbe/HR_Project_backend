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

@Controller('candidates')
export class CandidatesController {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly EmployeeService: EmployeeService,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }], {
      storage: dynamicCloudinaryStorage,
    }),
  )
  async create(
    @Body() data: CreateCandidateDto,
    @UploadedFiles() files: { photo?: Express.Multer.File[] },
  ) {
    let response: CustomBackendResponse;
    try {
      const photoPath = files.photo?.[0]?.path || '';
      data.personalInfo['photo'] = photoPath;
      const savedData = await this.candidatesService.create(data, photoPath);
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
