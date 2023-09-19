import { Injectable } from '@nestjs/common';
import { ReportType, data, Report } from '../data';
import { v4 as uuid } from 'uuid';
import {
  CreateReportDTO,
  ReportResponseDTO,
  UpdateReportDTO,
} from '../dtos/report.dto';

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDTO[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report
      .filter((rep) => rep.type === reportType)
      .map((report) => new ReportResponseDTO(report));
  }

  getReportById(id: string, type: ReportType): ReportResponseDTO {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const report = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
    if (!report) return;
    return new ReportResponseDTO(report);
  }

  createReport(type: ReportType, { source, amount }: CreateReportDTO) {
    const newReport: Report = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return new ReportResponseDTO(newReport);
  }

  updateReport(type: ReportType, id: string, body: UpdateReportDTO) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    let reportToUpdate = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;
    const newReport = {
      ...body,
      updated_at: new Date(),
    };
    reportToUpdate = Object.assign(reportToUpdate, newReport);

    return new ReportResponseDTO(reportToUpdate);
  }

  deleteReport(type: ReportType, id: string) {
    const reportToDelete = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!reportToDelete) return;
    const indexToDelete = data.report.findIndex((report) => report.id === id);

    data.report.splice(indexToDelete, 1);
    return;
  }
}
