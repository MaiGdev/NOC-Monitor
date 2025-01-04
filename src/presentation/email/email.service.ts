import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface SentMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: AttachmentOptions[];
}

interface AttachmentOptions {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private mailerService: string,
    private mailerEmail: string,
    private mailerSecretKey: string
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: mailerSecretKey,
      },
    });
  }

  async sendEmail(options: SentMailOptions): Promise<boolean> {
    try {
      const { to, subject, htmlBody, attachments = [] } = options;

      const sentInformation = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      console.log("Email sent: %s", sentInformation);

      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Log del servidor";
    const htmlBody = `<h3>Logs de sistema NOC</h3>
      <p>Voluptate sint dolor minim id elit et fugiat labore duis irure Lorem pariatur qui. Minim aliqua commodo esse sint sint veniam id amet minim commodo laborum officia. Veniam labore sint aliquip anim mollit incididunt voluptate ex ut est laborum deserunt minim. Incididunt excepteur exercitation labore eu minim.</p>
      `;

    const attachments: AttachmentOptions[] = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
