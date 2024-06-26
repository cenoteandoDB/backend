import nodemailer from "nodemailer";
import { readFileSync } from "fs";

export class EmailService {
  private EMAIL = process.env.EMAIL!;
  private EMAIL_PASSWORD = process.env.EMAIL_PASSWORD!;

  /**
   * Send an invitation code to a user.
   *
   * @param email the email of the user to invite
   * @param name the name of the invitee
   * @param code the generated code
   */
  async sendInvitationEmail(
    email: string,
    name: string,
    code: string,
  ): Promise<void> {
    let htmlEmail = readFileSync("templates/invitation.html", "utf-8");
    htmlEmail = htmlEmail.replace("{{name}}", name);
    htmlEmail = htmlEmail.replace("{{code}}", code);

    this.sendEmail(email, "subject", htmlEmail);
  }

  /**
   * Method to send an email given a template
   */
  private async sendEmail(
    emailTo: string,
    subject: string,
    htmlEmail: string,
  ): Promise<void> {
    const transporter = this.createTransporter();

    const mailOptions = {
      from: this.EMAIL,
      to: emailTo,
      subject: subject,
      html: htmlEmail,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error sending email: " + error);
    }
  }

  private createTransporter() {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: this.EMAIL,
        pass: this.EMAIL_PASSWORD,
      },
    });

    return transporter;
  }
}
