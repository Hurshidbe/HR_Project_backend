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

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }], {
      storage: dynamicCloudinaryStorage,
    }),
  )
  create(
    @Body() data: CreateCandidateDto,
    @UploadedFiles() files: { photo?: Express.Multer.File[] },
  ) {
    try {
      const photoPath = files.photo?.[0]?.path || '';
      data.photo = photoPath;

      return this.candidatesService.create(data, photoPath);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: any) {
    try {
      return await this.candidatesService.filterCandidates(query);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: Statuses,
  ) {
    try {
      return await this.candidatesService.updateStatus(id, status);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
