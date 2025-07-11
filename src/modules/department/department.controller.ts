import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Patch,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/department.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() dto: CreateDepartmentDto) {
    try {
      return this.departmentService.create(dto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  findAll() {
    try {
      return this.departmentService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.departmentService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateDepartmentDto) {
    try {
      return this.departmentService.update(id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.departmentService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
