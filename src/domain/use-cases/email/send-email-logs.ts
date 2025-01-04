import { EmailService } from "../../../presentation/email/email.service";
import { LogSeverityLevel } from "../../entities/log.entitiy";
import { SaveLogs } from "../logs/save-logs";

interface SentLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SentEmailLogs implements SentLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly saveLog: SaveLogs
  ) {}

  async execute(to: string | string[]) {
    try {
      const send = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!send) {
        throw new Error("Email not sent");
      }

      this.saveLog.execute({
        level: LogSeverityLevel.low,
        message: `Email sent to ${to}`,
        origin: "sent-email-logs.ts",
      });
      return true;
    } catch (error) {
      this.saveLog.execute({
        level: LogSeverityLevel.high,
        message: `Error sending email: ${error}`,
        origin: "sent-email-logs.ts",
      });
      return false;
    }
  }
}
