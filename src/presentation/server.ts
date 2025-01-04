import { envs } from "../config/plugins/envs.plugin";
import { SentEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { SaveLogs } from "../domain/use-cases/logs/save-logs";
import { FileSystemDataSourceImplementation } from "../insfrastructure/datasources/file-system.dataSource.imp";
import { LogRepositoryImplementation } from "../insfrastructure/repositories/log.repository.imp";
import { EmailService } from "./email/email.service";

const fileSistemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSourceImplementation()
  /* new mongo*/
  /* new posgre */
);

const saveLogs = new SaveLogs(fileSistemLogRepository);

const emailService = new EmailService(
  envs.MAILER_SERVICE,
  envs.MAILER_EMAIL,
  envs.MAILER_SECRET_KEY
);

export class Server {
  public static start() {
    console.log("Server starting");

    new SentEmailLogs(emailService, saveLogs).execute([
      "maikelgomezmurillo@gmail.com",
      "mgomzmu@gmail.com",
    ]);
    /*     emailService.sendEmail({
      to: "maikelgomezmurillo@gmail.com",
      subject: "Logs de sistema",
      htmlBody: `<h3>Logs de sistema NOC</h3>
      <p>Voluptate sint dolor minim id elit et fugiat labore duis irure Lorem pariatur qui. Minim aliqua commodo esse sint sint veniam id amet minim commodo laborum officia. Veniam labore sint aliquip anim mollit incididunt voluptate ex ut est laborum deserunt minim. Incididunt excepteur exercitation labore eu minim.</p>
      `,
    }) */
    /*     emailService.sendEmailWithFileSystemLogs([
      "maikelgomezmurillo@gmail.com",
      "mgomzmu@gmail.com",
    ]); */

    //
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
