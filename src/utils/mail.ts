import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import { compile } from 'handlebars';

interface parametersSendMail {
  userEmail: string;
  subject: string;
  templateName: string;
  message: string;
}

export const sendMail = async (params: parametersSendMail) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  fs.readFile(__dirname + `../../../public/templates/${params.templateName}`, {
    encoding: 'utf-8',
  })
    .then((html) => {
      const template = compile(html);
      const htmlToSend = template({ message: params.message });

      transporter.sendMail({
        from: process.env.EMAIL,
        to: params.userEmail,
        subject: params.subject,
        html: htmlToSend,
      });
    })
    .catch((error) => console.log(error));
};
