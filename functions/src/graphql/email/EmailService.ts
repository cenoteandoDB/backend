import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';

export class EmailService {

    async sendInvitationEmail(email: string): Promise<void> {
        this.sendEmail(email, "subject", "templateName", {"key": "value"});
    }

    /**
     * Method to send an email given a template
     */
    private async sendEmail(emailTo: string,
                            subject: string,
                            template: string, 
                            context: Record<string, string>): Promise<void> {
        const transporter = this.createTransporter()

        const htmlEmail = readFileSync(".templates/invitation.html", "utf-8");
        htmlEmail.replace("name", context.name); //TODO complete here

        const mailOptions = {
            from: '<my_email>@gmail.com',
            to: emailTo,
            subject: subject,
            template: template,
            context: context,
            html: htmlEmail
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        } catch (error) {
            console.error('Error sending email: ' + error);
        }
    };

    private createTransporter() {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'
            }
        });

        return transporter
    }

}