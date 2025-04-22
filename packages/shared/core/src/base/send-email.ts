import nodemailer from "nodemailer";

interface EmailOptions {
  from: string;
  to: string[];
  replyTo?: string[];
  subject: string;
  html: string;
}

export class SendEmail {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.seuservidor.com", // Ex: smtp.gmail.com
      port: 587,
      secure: false, // true para porta 465, false para outras
      auth: {
        user: "contato@realtrueweb.com.br",
        pass: "sua_senha_aqui",
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<string> {
    try {
      const info = await this.transporter.sendMail({
        from: options.from,
        to: options.to.join(", "),
        replyTo: options.replyTo?.join(", "),
        subject: options.subject,
        html: options.html,
      });

      if (info.rejected.length > 0) {
        return `Não foi possível enviar para: ${info.rejected.join(
          ", "
        )}<p>Os demais e-mails foram enviados com sucesso!</p>`;
      }

      return "E-mail enviado com sucesso!";
    } catch (error: any) {
      return `Erro ao enviar e-mail: ${error.message}`;
    }
  }
}
