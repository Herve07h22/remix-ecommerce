export type Mail = {
  to: string;
  subject: string;
  content: string;
};

export interface MailService {
  sendToken(to: string, url: string): Promise<void>;
}
