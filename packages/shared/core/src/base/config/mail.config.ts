// mail.config.ts

interface SMTPSecurityOptions {
  ssl: {
    verify_peer: boolean;
    verify_peer_name: boolean;
    allow_self_signed: boolean;
  };
}

interface MailConfig {
  mail_enviado_por: string;
  mail_nomedestinatario: string;
  mail_emaildestinatario: string;
  mail_host: string;
  mail_smtpauth: boolean;
  mail_username: string;
  mail_password: string;
  mail_smtpsecure: "tls" | "ssl" | "";
  mail_port: number;
  mail_charset: string;
  mail_smtpoptions: SMTPSecurityOptions;
  mail_smtpdebug: number;
}

// Simulando a função app('app_name') do PHP
const getAppName = (): string => {
  return "Grupo ++PHP"; // Substitua por valor dinâmico, se necessário
};

export const mailConfig: MailConfig = {
  mail_enviado_por: getAppName(),
  mail_nomedestinatario: getAppName(),
  mail_emaildestinatario: "souzacomprog@gmail.com",
  mail_host: "smtp.gmail.com",
  mail_smtpauth: true,
  mail_username: "souzacomprog@gmail.com",
  mail_password: "suasenhaaqui", // ⚠️ Nunca deixar senhas fixas em código real
  mail_smtpsecure: "tls",
  mail_port: 587,
  mail_charset: "UTF-8",
  mail_smtpoptions: {
    ssl: {
      verify_peer: false,
      verify_peer_name: false,
      allow_self_signed: true,
    },
  },
  mail_smtpdebug: 0,
};
