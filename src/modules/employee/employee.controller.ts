import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { HistoryService } from '../history/history.service';
import { CustomBackendResponse } from 'src/interceptors/backend.response';
import { BackupOptions } from 'node:sqlite';
import { PositionHistory } from '../history/entities/positionHistory.schema';
import { Position } from '../position/entities/position.entity';
import mongoose from 'mongoose';
import { PositionService } from '../position/position.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { resolve } from 'path';

@UseGuards(AuthGuard)
@Controller('api/v1/employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly historyService: HistoryService,
    private readonly positionService: PositionService,
  ) {}
  @Get()
  async all(@Query() query: any) {
    let response: CustomBackendResponse;
    const filter: any = {};

    try {
      if (query.fullName) {
        filter.fullName = { $regex: query.fullName, $options: 'i' };
      }
      if (query.sex) {
        filter.sex = query.sex;
      }
      if (query.employeeStatus) {
        filter.employeeStatus = query.employeeStatus;
      }
      if (query.region) {
        filter.region = query.region;
      }
      if (query.startDate || query.endDate) {
        filter.createdAt = {};
        if (query.startDate) {
          filter.createdAt.$gte = new Date(query.startDate);
        }
        if (query.endDate) {
          filter.createdAt.$lte = new Date(query.endDate);
        }
      }

      const employees = await this.employeeService.findAll(filter);
      response = new CustomBackendResponse(true, { employees });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }

    return response;
  }

  @Get(':id')
  async byId(@Param('id') id: string) {
    let response: CustomBackendResponse;
    try {
      const employee = await this.employeeService.findOne(id);
      response = new CustomBackendResponse(true, { employee });
    } catch (error) {
      response = new CustomBackendResponse(false, [error.message]);
    }
    return response;
  }

  @Patch(':id/salary')
  async updateSalary(
    @Param('id') id: string,
    @Body() body: { newSalary: number },
  ) {
    let response: CustomBackendResponse;
    try {
      const employee = await this.employeeService.findOne(id);
      const oldSalary = employee.salary;
      await this.historyService.createForSalaryRepo(
        employee.id,
        body.newSalary,
        oldSalary,
      );
      const updated = await this.employeeService.updateEmployeeSalary(
        id,
        body.newSalary,
      );
      response = new CustomBackendResponse(true, { updated });
    } catch (error) {
      response = new CustomBackendResponse(false, [error.message]);
    }
    return response;
  }
  @Patch(':id/position')
  async updatePosition(
    @Param('id') id: string,
    @Body() body: { newPosition: Position },
  ) {
    let response: CustomBackendResponse;
    try {
      const employee = await this.employeeService.findOne(id);
      const oldPositionResult = await this.positionService.getPositionById(
        employee.position,
      );
      if (!oldPositionResult) {
        throw new Error('Old position not found');
      }
      const oldPosition: Position = oldPositionResult;
      const updated = await this.employeeService.updateEmployeePosition(
        id,
        body.newPosition,
      );
      await this.historyService.createForPositionRepo(
        id,
        body.newPosition,
        oldPosition,
      );
      response = new CustomBackendResponse(true, { updated });
    } catch (error) {
      response = new CustomBackendResponse(false, [error.message]);
    }
    return response;
  }
}
