import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/position.dto';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  async create(@Body() data: CreatePositionDto) {
    try {
      return await this.positionService.create(data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.positionService.getAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, data: CreatePositionDto) {
    try {
      return await this.positionService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    try {
      return await this.positionService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
