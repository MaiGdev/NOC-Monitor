import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasorce } from "../insfrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../insfrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service";

const fileSistemLogRepository = new LogRepositoryImplementation(
  new FileSystemDatasorce()
  /* new mongo*/
  /* new posgre */
);

export class Server {
  public static start() {
    console.log("Server s tarting");

  
  //  CronService.createJob("*/5 * * * * *", () => {
  //    const date = new Date();
  //    console.log("5 seconds", date);
  //    const url = "http://google.com";
  //    //const url = "http://localhost:3000/posts";
//
  //    //new CheckService().execute("http://google.com")
  //    new CheckService(
  //      () => console.log(`${url} - is ok `),
  //      (error) => console.error(`Error: ${error}`),
  //      //undefined,
  //      //undefined,
  //      fileSistemLogRepository
  //    ).execute(url);
  //  }
  //  );
  
  }
}
