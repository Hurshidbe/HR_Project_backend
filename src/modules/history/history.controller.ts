import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { CustomBackendResponse } from '../../interceptors/backend.response';

@Controller('history')
@UseGuards(AuthGuard)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('salary')
  async getSalaryHistory(@Query() query: any) {
    let response: CustomBackendResponse;
    try {
      const salaryHistory = await this.historyService.getSalaryHistory(query);
      response = new CustomBackendResponse(true, { salaryHistory });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @Get('position')
  async getPositionHistory(@Query() query: any) {
    let response: CustomBackendResponse;
    try {
      const positionHistory =
        await this.historyService.getPositionHistory(query);
      response = new CustomBackendResponse(true, { positionHistory });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }

  @Get('employee/:employeeId')
  async getEmployeeHistory(@Param('employeeId') employeeId: string) {
    let response: CustomBackendResponse;
    try {
      const [salaryHistory, positionHistory] = await Promise.all([
        this.historyService.getSalaryHistoryByEmployee(employeeId),
        this.historyService.getPositionHistoryByEmployee(employeeId),
      ]);
      response = new CustomBackendResponse(true, {
        salaryHistory,
        positionHistory,
      });
    } catch (error) {
      response = new CustomBackendResponse(false, {}, [error.message]);
    }
    return response;
  }
}
