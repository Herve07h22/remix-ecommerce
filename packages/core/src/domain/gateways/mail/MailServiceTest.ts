import { MailService } from "./MailService";

export class MailServiceTest implements MailService {
  async sendToken(to: string, url: string) {
    // console.log(`Sending url ${url} to ${to}`);
  }
}
