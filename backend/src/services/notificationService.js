/** In-app ring buffer + console; optional SMTP via nodemailer */

const MAX = 300;
const events = [];

function pushEvent({ userId, type, title, body, refId }) {
  const row = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    userId: String(userId),
    type,
    title,
    body,
    refId: refId ? String(refId) : "",
    createdAt: new Date().toISOString(),
  };
  events.unshift(row);
  if (events.length > MAX) events.pop();
  // eslint-disable-next-line no-console
  console.log(`[NOTIFY] ${row.createdAt} user=${row.userId} type=${type} title=${title} body=${body} ref=${row.refId}`);
  return row;
}

export function listNotificationsForUser(userId, limit = 30) {
  const uid = String(userId);
  return events.filter((e) => e.userId === uid).slice(0, limit);
}

let mailerPromise;

async function getTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  if (!mailerPromise) {
    mailerPromise = import("nodemailer").then((nm) =>
      nm.default.createTransport({
        host,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth:
          process.env.SMTP_USER && process.env.SMTP_PASS
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            : undefined,
      })
    );
  }
  return mailerPromise;
}

async function sendMailIfConfigured({ to, subject, text }) {
  if (!to || !process.env.SMTP_HOST) return;
  try {
    const transport = await getTransport();
    if (!transport) return;
    await transport.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@localhost",
      to,
      subject,
      text,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[NOTIFY] SMTP error", e?.message || e);
  }
}

export async function notifyUser(userId, email, { type, title, body, refId }) {
  pushEvent({ userId, type, title, body, refId });
  if (email) {
    await sendMailIfConfigured({
      to: email,
      subject: title,
      text: `${body}\n\n${refId ? `Tham chiếu: ${refId}\n` : ""}`,
    });
  }
}
