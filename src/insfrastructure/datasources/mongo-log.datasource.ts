import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entitiy";

export class MongoLogDatasourceImp implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newMongoLog = await LogModel.create(log);
    await newMongoLog.save();
    console.log(`Log saved to MongoDB: ${newMongoLog.id}`);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const newMongoLog = await LogModel.find({
      level: severityLevel,
    });
    return newMongoLog.map((mongoLog) => LogEntity.fromObject(mongoLog));
  }
}
