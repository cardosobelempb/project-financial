# ✅ 1. Instale as dependências

npm install nodemailer dotenv
# ✅ 2. Crie um arquivo .env na raiz do seu projeto
- MAIL_USERNAME=souzacomprog@gmail.com
- MAIL_PASSWORD=suasenhaaqui
  
# ✅ 3. Crie o arquivo de configuração mail.config.ts

// mail.config.ts
- import dotenv from 'dotenv';
- dotenv.config();

```
export const mailConfig = {
  fromName: 'Grupo ++PHP',
  toName: 'Grupo ++PHP',
  toEmail: 'souzacomprog@gmail.com',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.MAIL_USERNAME!,
    pass: process.env.MAIL_PASSWORD!,
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: false,
};

```
# ✅ 4. Envio de e-mail com nodemailer

// send-mail.ts
```
import nodemailer from 'nodemailer';
import { mailConfig } from './mail.config';

async function sendMail() {
  try {
    const transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: mailConfig.auth,
      tls: mailConfig.tls,
      debug: mailConfig.debug,
    });

    const info = await transporter.sendMail({
      from: `"${mailConfig.fromName}" <${mailConfig.auth.user}>`,
      to: `"${mailConfig.toName}" <${mailConfig.toEmail}>`,
      subject: 'Testando envio de e-mail com Nodemailer',
      text: 'Olá! Este é um e-mail de teste enviado com Nodemailer e TypeScript.',
      html: '<p><strong>Olá!</strong> Este é um e-mail de teste enviado com <em>Nodemailer</em> e <em>TypeScript</em>.</p>',
    });

    console.log('✅ E-mail enviado com sucesso! ID:', info.messageId);
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error);
  }
}

sendMail();
```

# - ✅ Resultado esperado
Você verá algo como:

### ✅ E-mail enviado com sucesso! ID: <xxxxxxxxxxxxxxxxx@domain>
- E o e-mail chegará na sua caixa de entrada.

