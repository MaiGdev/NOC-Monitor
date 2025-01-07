
export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}


export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt?: Date;
  public origin: string;

  constructor(opciones: LogEntityOptions) {
    const { level, message, createdAt = new Date() } = opciones;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = opciones.origin;
  }

  static fromJson(json: string): LogEntity {
    
    json = (json === "") ? "{}": json

    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({
      level,
      message,
      createdAt,
      origin,
    });
    log.createdAt = new Date(createdAt);

    return log;
  }

  static fromObject = (obj: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = obj;
    const log = new LogEntity({
      level,
      message,
      origin,
      createdAt,
    });
    return log;
  };
}