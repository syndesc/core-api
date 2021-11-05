import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import ejs from 'ejs';

interface ISendEmail {
    to: string;
    subject: string;
    data: any;
    template: string;
}
export default async function sendEmail({ to, subject, data, template }: ISendEmail): Promise<void> {

    const host = process.env.MAIL_HOST as string;
    const port = Number(process.env.MAIL_PORT);
    const user = process.env.MAIL_USER as string;
    const pass = process.env.MAIL_PASS as string;

    const transport = nodemailer.createTransport({
        host,
        port,
        auth: {
            user,
            pass
        }
    });

    const file = await fs.readFile(path.resolve(__dirname, '..', '..', 'templates', `${template}.ejs`), {
        encoding: 'utf-8'
    });

    const compiled = ejs.compile(file);
    await transport.sendMail({
        to,
        from: 'no-reply@syndesc.com',
        subject,
        html: compiled(data)
    });

}
