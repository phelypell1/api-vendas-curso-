import nodemailer from 'nodemailer';
import HandlebarTemplate from './HandlebarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}
interface ITemplateVariable {
  [Key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandlebarTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe Serviços',
        address: from?.email || 'equipe@seudominio.com.br',
      },
      to: {
        name: to?.name,
        address: to?.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMail;
