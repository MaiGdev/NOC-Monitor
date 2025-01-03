import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entitiy";
import { LogRepositoy } from "../../domain/repository/log.repository";



export class LogRepositoryImplementation implements LogRepositoy {
  /*   private logDataSource: LogDatasource; */

  constructor(private readonly logDataSource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.logDataSource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel);
  }
}