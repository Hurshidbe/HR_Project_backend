import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { HistoryService } from '../history/history.service';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CustomBackendResponse } from 'src/interceptors/backend.response';
import { BackupOptions } from 'node:sqlite';
import { PositionHistory } from '../history/entities/positionHistory.schema';
import { Position } from '../position/entities/position.entity';
import mongoose from 'mongoose';
import { PositionService } from '../position/position.service';
@ApiParam({
  name: 'id',
  required: true,
  example: '',
})
@Controller('api/v1/employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly historyService: HistoryService,
    private readonly positionService: PositionService,
  ) {}

  @Patch(':id/salary')
  @ApiOperation({ description: 'update candidate salary' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        newSalary: {
          type: 'number',
          example: 3500,
        },
      },
      required: ['newSalary'],
    },
  })
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
  @ApiOperation({
    description: 'Update employee position and create position history',
  })
  @ApiParam({
    name: 'id',
    required: true,
    example: '64b7f54475c4f3872581d4b9',
    description: 'Employee ID',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        newPosition: {
          type: 'string',
          example: '64b8cd0d8b4e3eaa5fca9013',
          description: 'New position ID (ObjectId of Position)',
        },
      },
      required: ['newPosition'],
    },
  })
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
