import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

const ensureTransporter = (): nodemailer.Transporter => {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("SMTP_HOST, SMTP_USER, and SMTP_PASS must be set to send mail.");
  }
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // SSL on 465; STARTTLS on 587 / 25
    auth: { user, pass },
  });
  return transporter;
};

export const getFromAddress = (): string => {
  return process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "";
};

export type SendArgs = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export const sendMail = async ({ to, subject, text, replyTo }: SendArgs): Promise<{ messageId: string }> => {
  const t = ensureTransporter();
  const from = getFromAddress();
  if (!from) throw new Error("SMTP_FROM (or SMTP_USER) must be set.");
  const info = await t.sendMail({ from, to, subject, text, replyTo });
  return { messageId: info.messageId };
};
