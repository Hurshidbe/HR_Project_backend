import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { createAdminDto, LoginDto } from './dto/admin.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Candidate } from '../candidates/entities/candidate.schema';
import { UsersService } from './users.service';
import { CustomBackendResponse } from 'src/interceptors/backend.response';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({})
  @ApiBody({ type: LoginDto })
  async login(@Body() data: LoginDto, @Res() res: Response) {
    let response: CustomBackendResponse;
    try {
      const { status, token } = await this.usersService.login(data);
      res.cookie('authToken', token, { httpOnly: true });
      response = new CustomBackendResponse(true, { status });
      return res.status(200).json(response);
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async findAll() {
    let response: CustomBackendResponse;
    try {
      const all = await this.usersService.findAll();
      response = new CustomBackendResponse(true, { all });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    example: '6877902531dae375bd20edc8',
  })
  async findOne(@Param('id') id: string) {
    let response: CustomBackendResponse;
    try {
      const findOne = await this.usersService.findOne(id as any);
      response = new CustomBackendResponse(true, { findOne });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  @ApiBody({ type: createAdminDto })
  async add(@Body() data: createAdminDto) {
    let response: CustomBackendResponse;
    try {
      const admin = await this.usersService.addUser(data);
      response = new CustomBackendResponse(true, { admin });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBody({ type: LoginDto })
  @ApiParam({ name: 'id', example: '687b601811389c5ff40baf20', required: true })
  async update(@Param('id') id: string, @Body() data: LoginDto) {
    let response: CustomBackendResponse;
    try {
      const updated = await this.usersService.update(id, data);
      response = new CustomBackendResponse(true, { updated });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @UseGuards(AuthGuard, RoleGuard)
  @ApiParam({ name: 'id', required: true, example: '687b6ae4e88449af372e8a34' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response: CustomBackendResponse;
    try {
      const removed = await this.usersService.remove(id);
      response = new CustomBackendResponse(true, { removed });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }
}
