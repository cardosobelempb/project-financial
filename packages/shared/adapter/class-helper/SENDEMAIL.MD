# ✅ Versão TypeScript com Nodemailer
### 1. Instale o Nodemailer:
- Se ainda não tiver, instale via terminal:

```
npm install nodemailer

```

## 2. Classe SendEmail.ts

```
import nodemailer from 'nodemailer';

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
            host: 'smtp.seuservidor.com', // Ex: smtp.gmail.com
            port: 587,
            secure: false, // true para porta 465, false para outras
            auth: {
                user: 'contato@realtrueweb.com.br',
                pass: 'sua_senha_aqui'
            }
        });
    }

    async sendEmail(options: EmailOptions): Promise<string> {
        try {
            const info = await this.transporter.sendMail({
                from: options.from,
                to: options.to.join(', '),
                replyTo: options.replyTo?.join(', '),
                subject: options.subject,
                html: options.html
            });

            if (info.rejected.length > 0) {
                return `Não foi possível enviar para: ${info.rejected.join(', ')}<p>Os demais e-mails foram enviados com sucesso!</p>`;
            }

            return 'E-mail enviado com sucesso!';
        } catch (error: any) {
            return `Erro ao enviar e-mail: ${error.message}`;
        }
    }
}

```

## 3. Exemplo de uso

```
import { SendEmail } from './SendEmail';

const dadosForm = {
    nome: 'João',
    email: 'usuario@teste.com',
    assunto: 'Teste de envio',
    msg: 'Essa é uma mensagem de teste.'
};

async function enviar() {
    if (Object.values(dadosForm).some(campo => campo.trim() === '')) {
        console.log('Preencha todos os campos!');
        return;
    }

    const emailSender = new SendEmail();

    const html = `
        <img src="https://www.seusite.com.br/assets/img/capa-min.png" alt="Capa do Canal" title="Capa do Canal" /><br />
        O email recebido foi de: <strong>${dadosForm.email}</strong><br />
        Mensagem: ${dadosForm.msg}
    `;

    const result = await emailSender.sendEmail({
        from: 'contato@realtrueweb.com.br',
        to: [dadosForm.email],
        replyTo: ['souzacomprog@gmail.com'],
        subject: dadosForm.assunto,
        html
    });

    console.log(result);
}

enviar();

```

Claro! Aqui está a conversão do seu código PHP para uma **classe `SendEmail` em TypeScript**, utilizando **Node.js com Nodemailer**, que é uma das bibliotecas mais populares para envio de e-mails em JavaScript/TypeScript.

---

## ✅ Versão TypeScript com Nodemailer

### 1. Instale o Nodemailer:
Se ainda não tiver, instale via terminal:

```bash
npm install nodemailer
```

---

### 2. Classe `SendEmail.ts`

```ts
import nodemailer from 'nodemailer';

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
            host: 'smtp.seuservidor.com', // Ex: smtp.gmail.com
            port: 587,
            secure: false, // true para porta 465, false para outras
            auth: {
                user: 'contato@realtrueweb.com.br',
                pass: 'sua_senha_aqui'
            }
        });
    }

    async sendEmail(options: EmailOptions): Promise<string> {
        try {
            const info = await this.transporter.sendMail({
                from: options.from,
                to: options.to.join(', '),
                replyTo: options.replyTo?.join(', '),
                subject: options.subject,
                html: options.html
            });

            if (info.rejected.length > 0) {
                return `Não foi possível enviar para: ${info.rejected.join(', ')}<p>Os demais e-mails foram enviados com sucesso!</p>`;
            }

            return 'E-mail enviado com sucesso!';
        } catch (error: any) {
            return `Erro ao enviar e-mail: ${error.message}`;
        }
    }
}
```

---

### 3. Exemplo de uso

```ts
import { SendEmail } from './SendEmail';

const dadosForm = {
    nome: 'João',
    email: 'usuario@teste.com',
    assunto: 'Teste de envio',
    msg: 'Essa é uma mensagem de teste.'
};

async function enviar() {
    if (Object.values(dadosForm).some(campo => campo.trim() === '')) {
        console.log('Preencha todos os campos!');
        return;
    }

    const emailSender = new SendEmail();

    const html = `
        <img src="https://www.seusite.com.br/assets/img/capa-min.png" alt="Capa do Canal" title="Capa do Canal" /><br />
        O email recebido foi de: <strong>${dadosForm.email}</strong><br />
        Mensagem: ${dadosForm.msg}
    `;

    const result = await emailSender.sendEmail({
        from: 'contato@realtrueweb.com.br',
        to: [dadosForm.email],
        replyTo: ['souzacomprog@gmail.com'],
        subject: dadosForm.assunto,
        html
    });

    console.log(result);
}

enviar();
```

---

# 🛡️ Dicas de Segurança

- **Não coloque senhas diretamente no código.** Use variáveis de ambiente (`dotenv`).
- Evite colocar `SMTP`, `senha`, ou `email` fixos — ideal é pegar tudo do `.env`.

Quer que eu monte essa versão usando `.env` também? Ou prefere que a classe funcione em frontend com serviços como EmailJS ou Formspree (sem Node)?