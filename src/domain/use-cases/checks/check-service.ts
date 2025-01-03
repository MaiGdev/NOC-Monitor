import { LogEntity, LogSeverityLevel } from "../../entities/log.entitiy";
import { LogRepositoy } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class CheckService implements CheckService {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
    private readonly logRepository: LogRepositoy
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }

      //const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low);
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} working`,
        origin: "check-service.ts",
      });
      this.logRepository.saveLog(log);
      this.successCallback() && this.successCallback();

      return true;
    } catch (error) {
      const errorMessage = `${url} -  ${error}`;
      console.error("CheckService error:", errorMessage);
      /*  this.errorCallback(errorMessage); */

      //const log = new LogEntity(errorMessage, LogSeverityLevel.high);
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: errorMessage,
        origin: "check-service.ts",
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
