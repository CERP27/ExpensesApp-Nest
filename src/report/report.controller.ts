import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from '../data';
import {
  CreateReportDTO,
  ReportResponseDTO,
  UpdateReportDTO,
} from '../dtos/report.dto';

import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDTO[] {
    return this.reportService.getAllReports(type);
  }

  @Get(':id')
  getReportById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDTO {
    return this.reportService.getReportById(id, type);
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Body() body: CreateReportDTO,
  ): ReportResponseDTO {
    return this.reportService.createReport(type, body);
  }

  @Put(':id')
  updateReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Body() body: UpdateReportDTO,
  ): ReportResponseDTO {
    return this.reportService.updateReport(type, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    return this.reportService.deleteReport(type, id);
  }
}

//http://localhost:3000/ + controller decorator + method decorator
