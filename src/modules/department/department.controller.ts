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
import { CustomBackendResponse } from 'src/interceptors/backend.response';
import { response } from 'express';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('api/v1/departments')
@ApiBearerAuth('access-token')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiBody({ type: CreateDepartmentDto })
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

  @Get(':id')
  @ApiParam({ name: 'id', required: true, example: '687b94abb44adf58faf24e17' })
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
  @ApiParam({ name: 'id', example: '687b94abb44adf58faf24e17', required: true })
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
  @ApiParam({ required: true, name: 'id', example: '687b94abb44adf58faf24e17' })
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
