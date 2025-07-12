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
import { CreateCandidateDto } from './dto/candidate.dto';
import { dynamicCloudinaryStorage } from 'src/interceptors/cloudinary.config';
import { AuthGuard } from 'src/guards/auth.guard';
import { Candidate } from './entities/candidate.schema';
import { Statuses } from 'src/enums/enums';
import { CustomBackendResponse } from 'src/interceptors/backend.response';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

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
      data.photo = photoPath;
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
  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: Statuses,
  ) {
    let response: CustomBackendResponse;
    try {
      const updated = await this.candidatesService.updateStatus(id, status);
      response = new CustomBackendResponse(true, updated);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }
}
