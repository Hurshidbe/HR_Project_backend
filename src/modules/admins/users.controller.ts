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

@Controller('admins')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() data: LoginDto, @Res() res: Response) {
    try {
      const { status, token } = await this.usersService.login(data);
      res.cookie('authToken', token, { httpOnly: true });
      return res.send(status);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOne(id as any);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Post('add-admin')
  async add(@Body() data: createAdminDto) {
    try {
      return await this.usersService.addUser(data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: LoginDto) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  ///////////////////////////////////////////////////////////////////////////////////

  // @Patch('reject/:id')
  // async reject(@Param('id') id: string) {
  //   try {
  //     return await this.adminsService.reject(id);
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // @Patch('accept/:id')
  // async accept(@Param('id') id: string) {
  //   try {
  //     return await this.adminsService.accept(id);
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // @Get()
  // async getAllCandidates(@Query() query: any) {
  //   const filter: Partial<Candidate> = {}

  //   if (query.status) {
  //     filter.status = query.status
  //   }

  //   if (query.convicted) {
  //     filter.convicted = query.conviced
  //   }

  //   try {
  //     const candidates = await this.candidateService.getAll(filter)
  //   } catch () {}
  // }
}
