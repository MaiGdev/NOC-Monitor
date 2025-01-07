import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entitiy";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgressLogDataSourceImp implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    const newLog = await prismaClient.logModel.create({
      data: {
        level: level,
        message: log.message,
        createdAt: log.createdAt,
        origin: log.origin,
      },
    });
/*     console.log(`Log saved to PostgreSQL: ${newLog.id}`); */
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];
    const logs = await prismaClient.logModel.findMany({
      where: {
        level: level,
      },
    });
    return logs.map(LogEntity.fromObject);
  }
}
