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
  Req,
} from '@nestjs/common';
import { createAdminDto, LoginDto } from './dto/admin.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from './users.service';
import { ResponseUtil } from 'src/utils/response.util';
import { ApiResponse } from 'src/types/common.types';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() data: LoginDto): Promise<ApiResponse<any>> {
    try {
      const result = await this.usersService.login(data);
      return ResponseUtil.success(result.data, 'Login successful');
    } catch (error) {
      return ResponseUtil.error(error.message, 'Login failed');
    }
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async findAll(): Promise<ApiResponse<any>> {
    try {
      const result = await this.usersService.findAll();
      return ResponseUtil.success(
        result.data,
        'Admin users retrieved successfully',
      );
    } catch (error) {
      return ResponseUtil.error(
        error.message,
        'Failed to retrieve admin users',
      );
    }
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<any>> {
    try {
      const result = await this.usersService.findOne(id);
      return ResponseUtil.success(
        result.data,
        'Admin user retrieved successfully',
      );
    } catch (error) {
      return ResponseUtil.error(error.message, 'Failed to retrieve admin user');
    }
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async add(@Body() data: createAdminDto): Promise<ApiResponse<any>> {
    try {
      const result = await this.usersService.addUser(data);
      return ResponseUtil.created(
        result.data,
        'Admin user created successfully',
      );
    } catch (error) {
      return ResponseUtil.error(error.message, 'Failed to create admin user');
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: LoginDto,
  ): Promise<ApiResponse<any>> {
    try {
      const updated = await this.usersService.update(id, data);
      return ResponseUtil.updated(updated, 'Admin user updated successfully');
    } catch (error) {
      return ResponseUtil.error(error.message, 'Failed to update admin user');
    }
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<any>> {
    try {
      const removed = await this.usersService.remove(id);
      return ResponseUtil.success(removed, 'Admin user deleted successfully');
    } catch (error) {
      return ResponseUtil.error(error.message, 'Failed to delete admin user');
    }
  }
}
