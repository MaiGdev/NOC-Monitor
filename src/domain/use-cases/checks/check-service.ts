import { EmailService } from "../../../presentation/email/email.service";
import { LogSeverityLevel } from "../../entities/log.entitiy";
import { SaveLogs } from "../logs/save-logs";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly saveLogs: SaveLogs,
    private readonly emailService: EmailService
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }

      this.saveLogs.execute({
        level: LogSeverityLevel.low,
        message: `Service ${url} working`,
        origin: "check-service.ts",
      });
      this.successCallback() && this.successCallback();

      this.emailService.sendEmailWithFileSystemLogs([
        "maikelgomezmurillo@gmail.com",
        "mgomzmu@gmail.com",
      ]);

      return true;
    } catch (error) {
      const errorMessage = `${url} -  ${error}`;
      console.error("CheckService error:", errorMessage);

      this.saveLogs.execute({
        level: LogSeverityLevel.high,
        message: errorMessage,
        origin: "check-service.ts",
      });
      return false;
    }
  }
}
