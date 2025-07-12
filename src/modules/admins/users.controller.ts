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

@Controller('admins')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() data: LoginDto, @Res() res: Response) {
    let response: CustomBackendResponse;
    try {
      const { status, token } = await this.usersService.login(data);
      res.cookie('authToken', token, { httpOnly: true });
      response = new CustomBackendResponse(true, { status });
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
  @Post('add-admin')
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

  @Patch(':id')
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
