import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SaveLogs } from "../domain/use-cases/logs/save-logs";
import { FileSystemDataSourceImp } from "../insfrastructure/datasources/file-system.datasource.imp";
import { MongoLogDatasourceImp } from "../insfrastructure/datasources/mongo-log.datasource";

import { PostgressLogDataSourceImp } from "../insfrastructure/datasources/postgre-log.datasource";

import { LogRepositoryImpl } from "../insfrastructure/repositories/log.repository.multi.imp";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

/* const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasourceImp()
); */

const logRepositoryMulti = new LogRepositoryImpl([
  /* filesystem */
  new FileSystemDataSourceImp(),
  /* MongoDB*/
  new MongoLogDatasourceImp(),
  /* new posgre */
  new PostgressLogDataSourceImp(),
]);

const saveLogs = new SaveLogs(logRepositoryMulti);

const emailService = new EmailService(
  envs.MAILER_SERVICE,
  envs.MAILER_EMAIL,
  envs.MAILER_SECRET_KEY
);

export class Server {
  public static start() {
    console.log("Server starting");

    CronService.createJob("*/5 * * * * *", () => {
      const date = new Date();
      console.log("5 seconds", date);
      /*
      //json-server proyect
      const url = "http://localhost:3000/posts"; 
      */
     const url = "http://google.com";

      new CheckService(
        () => console.log(`${url} - is ok `),
        //(error) => console.error(`Error: ${error}`),
        //undefined,
        saveLogs,
        emailService
      ).execute(url);
    });
  }
}
