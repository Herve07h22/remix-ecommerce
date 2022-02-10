import { MailgunMailService } from "./MailgunMailService"

it("The mailgun mail service does the job", async () => {
    const mailgunService = new MailgunMailService(true)
    await mailgunService.sendToken("contact@camilab.co", "https://sugggest.co/test")

})