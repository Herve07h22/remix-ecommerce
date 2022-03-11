import { MailService } from "../../domain/gateways/mail/MailService";

import * as dotenv from "dotenv";

const path = require("path");

dotenv.config({
  debug: true,
  path: path.resolve(process.cwd(), ".env"),
});

import * as nodemailer from "nodemailer";

export class MailgunMailService implements MailService {
  private mailgunUser: string;
  private mailgunKey: string;
  private sendMail: string;
  private transporter?: nodemailer.Transporter;

  constructor(private debug?: boolean) {
    this.mailgunKey = process.env.MAILGUN_KEY || "";
    this.mailgunUser = process.env.MAILGUN_USER || "";
    this.sendMail =
      process.env.MAILGUN_SEND_MAIL || "Sugggest <sugggest@camilab.co>";
    if (!this.mailgunKey)
      throw new Error("Error : MAILGUN_KEY is not set in .env");
    if (!this.mailgunUser)
      throw new Error("Error : MAILGUN_USER is not set in .env");

    if (!debug) {
      this.transporter = nodemailer.createTransport({
        host: "smtp.eu.mailgun.org",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: this.mailgunUser, // generated ethereal user
          pass: this.mailgunKey, // generated ethereal password
        },
      });
    }
  }

  formatHtmlMessage(url: string) {
    return `<p><small>(Ce message est envoyé automatiquement, ne pas y répondre)</small></p>
      <p>Voici votre lien d'accès à Sugggest : <a href="${url}">${url}</a></p>
      <p>Il est valable 24h et permet de réaliser 10 générations de texte.</p>`;
  }

  async sendToken(to: string, url: string): Promise<void> {
    if (this.debug) return;

    let info = await this.transporter?.sendMail({
      from: this.sendMail, // sender address
      to: to, // list of receivers
      subject: "Votre lien d'accès à Sugggest ✔", // Subject line
      html: this.formatHtmlMessage(url), // html body
    });

    // console.log("Message sent: %s", info.messageId);
  }
}
