import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entitiy";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDataSource: LogDatasource[]) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.logDataSource.forEach((entity) => {
      entity.saveLog(log);
    });
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const allLogs: LogEntity[] = [];
    for (const dataSource of this.logDataSource) {
      const logs = await dataSource.getLogs(severityLevel);
      allLogs.push(...logs);
    }
    return allLogs;
  }
}
