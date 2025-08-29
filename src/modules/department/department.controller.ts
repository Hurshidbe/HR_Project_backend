import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/department.dto';
import { CustomBackendResponse } from 'src/interceptors/backend.response';
import { response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() dto: CreateDepartmentDto) {
    let response: CustomBackendResponse;
    try {
      const created = await this.departmentService.create(dto);
      response = new CustomBackendResponse(true, created, []);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @Get()
  async findAll() {
    let response: CustomBackendResponse;
    try {
      const data = await this.departmentService.findAll();
      response = new CustomBackendResponse(true, { data });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @Get('with-positions')
  async findAllWithPositions() {
    let response: CustomBackendResponse;
    try {
      const data = await this.departmentService.findAllWithPositions();
      response = new CustomBackendResponse(true, { data });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response: CustomBackendResponse;
    try {
      const data = await this.departmentService.findOne(id);
      response = new CustomBackendResponse(true, { data });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CreateDepartmentDto) {
    let response: CustomBackendResponse;
    try {
      const updated = await this.departmentService.update(id, dto);
      response = new CustomBackendResponse(true, { updated });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response: CustomBackendResponse;
    try {
      const removed = await this.departmentService.remove(id);
      response = new CustomBackendResponse(true, { removed });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }
}
