import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/position.dto';
import { CustomBackendResponse } from 'src/interceptors/backend.response';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
@UseGuards(AuthGuard)
@Controller('api/v1/position')
@ApiBearerAuth('access-token')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  @ApiBody({ type: CreatePositionDto })
  async create(@Body() data: CreatePositionDto) {
    let response: CustomBackendResponse;
    try {
      const created = await this.positionService.create(data);
      response = new CustomBackendResponse(true, { created }, []);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @Get()
  async findAll() {
    let response: CustomBackendResponse;
    try {
      const data = await this.positionService.getAll();
      response = new CustomBackendResponse(true, { data }, []);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, example: '687ba07b2656fc0f17b3303d' })
  async findOne(@Param('id') id: string) {
    let response: CustomBackendResponse;
    try {
      const data = await this.findOne(id);
      response = new CustomBackendResponse(true, { data }, []);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @Patch(':id')
  @ApiBody({ type: CreatePositionDto })
  @ApiParam({ name: 'id', required: true, example: '687ba07b2656fc0f17b3303d' })
  @ApiBody({ type: CreatePositionDto })
  async update(@Param('id') id: string, data: CreatePositionDto) {
    let response: CustomBackendResponse;
    try {
      const updated = await this.positionService.update(id, data);
      response = new CustomBackendResponse(true, { updated }, []);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, example: '687ba07b2656fc0f17b3303d' })
  async deleteOne(@Param('id') id: string) {
    let response: CustomBackendResponse;
    try {
      const deleted = await this.positionService.delete(id);
      response = new CustomBackendResponse(true, { deleted }, []);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }
}
