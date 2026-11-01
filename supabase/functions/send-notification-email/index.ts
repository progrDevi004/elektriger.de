import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// SMTP Configuration for Strato
const SMTP_HOST = "smtp.strato.de";
const SMTP_PORT = 465;
const SMTP_USER = "info@ee-alici.de";
const ADMIN_EMAIL = "info@ee-alici.de";

// Brand Colors (Elektiger — orange)
const COLORS = {
  background: "#fff7ed",
  cardBg: "#ffffff",
  border: "#fed7aa",
  blue: "#ea580c",
  blueLight: "#f97316",
  blueAccent: "#ff5a00",
  textPrimary: "#0f172a",
  textSecondary: "#475569",
  textMuted: "#64748b",
};

const COMPANY = {
  name: "Elektiger",
  tagline: "Elektriker mit Biss",
  phone: "01520 6268513",
  email: "info@ee-alici.de",
  website: "https://www.elektiger.de",
};

interface ContactSubmission {
  type: "contact";
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  subject: string;
  message: string;
  userType: "privat" | "gewerbe" | "bewerber" | "unternehmen";
}

interface CVSubmission {
  type: "cv";
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  currentPosition?: string;
  targetPosition?: string;
  additionalNotes?: string;
}

type EmailRequest = ContactSubmission | CVSubmission;

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");
};

const emailWrapper = (content: string, previewText: string) => `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${COMPANY.name}</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.background};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.background};">
<tr>
<td align="center" style="padding:40px 20px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr>
<td style="padding-bottom:24px;text-align:center;">
<div style="display:inline-block;background:linear-gradient(135deg,${COLORS.blue},${COLORS.blueAccent});padding:12px 24px;border-radius:10px;">
<span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:0.5px;">${COMPANY.name}</span>
</div>
<p style="margin:8px 0 0 0;color:${COLORS.textMuted};font-size:12px;">${COMPANY.tagline}</p>
</td>
</tr>
<tr>
<td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.cardBg};border:1px solid ${COLORS.border};border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(234,88,12,0.08);">
<tr><td style="height:4px;background:linear-gradient(90deg,${COLORS.blue},${COLORS.blueAccent});"></td></tr>
${content}
</table>
</td>
</tr>
<tr>
<td style="padding-top:24px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="color:${COLORS.textMuted};font-size:12px;line-height:1.6;">
<strong style="color:${COLORS.textSecondary};">${COMPANY.name}</strong><br>
<a href="tel:${COMPANY.phone}" style="color:${COLORS.blue};text-decoration:none;">${COMPANY.phone}</a> &nbsp;·&nbsp;
<a href="mailto:${COMPANY.email}" style="color:${COLORS.blue};text-decoration:none;">${COMPANY.email}</a><br>
<a href="${COMPANY.website}" style="color:${COLORS.blue};text-decoration:none;">${COMPANY.website}</a>
<p style="margin:12px 0 0 0;color:${COLORS.textMuted};font-size:11px;">&copy; ${new Date().getFullYear()} ${COMPANY.name}. Alle Rechte vorbehalten.</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;

const infoRow = (label: string, value: string, isLast: boolean = false) => `
<tr>
<td style="padding:12px 0;${isLast ? "" : `border-bottom:1px solid ${COLORS.border};`}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="color:${COLORS.textMuted};font-size:13px;width:140px;vertical-align:top;">${label}</td>
<td style="color:${COLORS.textPrimary};font-size:14px;">${value}</td>
</tr>
</table>
</td>
</tr>`;

// ============================================
// ADMIN NOTIFICATION TEMPLATES
// ============================================

const adminContactPrivatTemplate = (data: ContactSubmission) => {
  const escapedMessage = escapeHtml(data.message);

  return emailWrapper(`
<tr>
<td style="padding:32px 32px 0 32px;">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="width:56px;height:56px;background:linear-gradient(135deg,${COLORS.blue},${COLORS.blueAccent});border-radius:50%;text-align:center;vertical-align:middle;font-size:24px;color:#fff;">&#127968;</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:24px 32px 8px 32px;">
<h1 style="margin:0;font-size:22px;font-weight:600;color:${COLORS.textPrimary};">Neue Privatkunden-Anfrage</h1>
<p style="margin:8px 0 0 0;font-size:14px;color:${COLORS.textSecondary};">Ein Privatkunde hat über die Website Kontakt aufgenommen.</p>
</td>
</tr>
<tr>
<td style="padding:24px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.background};border-radius:12px;">
<tr><td style="padding:20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${infoRow("Name", `${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}`)}
${infoRow("E-Mail", `<a href="mailto:${escapeHtml(data.email)}" style="color:${COLORS.blue};">${escapeHtml(data.email)}</a>`)}
${data.phone ? infoRow("Telefon", `<a href="tel:${escapeHtml(data.phone)}" style="color:${COLORS.blue};">${escapeHtml(data.phone)}</a>`) : ""}
${infoRow("Betreff", `<strong style="color:${COLORS.blue};">${escapeHtml(data.subject)}</strong>`, true)}
</table>
</td></tr>
</table>
</td>
</tr>
<tr>
<td style="padding:0 32px 32px 32px;">
<p style="margin:0 0 8px 0;font-size:13px;font-weight:500;color:${COLORS.textSecondary};text-transform:uppercase;letter-spacing:0.5px;">Nachricht</p>
<div style="background-color:${COLORS.background};border-left:3px solid ${COLORS.blueAccent};padding:16px 20px;border-radius:0 8px 8px 0;">
<p style="margin:0;font-size:14px;color:${COLORS.textPrimary};line-height:1.6;">${escapedMessage}</p>
</div>
</td>
</tr>
`, `Neue Privatkunden-Anfrage von ${data.firstName} ${data.lastName}`);
};

const adminContactGewerbeTemplate = (data: ContactSubmission) => {
  const escapedMessage = escapeHtml(data.message);

  return emailWrapper(`
<tr>
<td style="padding:32px 32px 0 32px;">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="width:56px;height:56px;background:linear-gradient(135deg,${COLORS.blueAccent},${COLORS.blue});border-radius:50%;text-align:center;vertical-align:middle;font-size:24px;color:#fff;">&#127970;</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:24px 32px 8px 32px;">
<h1 style="margin:0;font-size:22px;font-weight:600;color:${COLORS.textPrimary};">Neue Gewerbekunden-Anfrage</h1>
<p style="margin:8px 0 0 0;font-size:14px;color:${COLORS.textSecondary};">Ein Gewerbekunde hat über die Website Kontakt aufgenommen.</p>
</td>
</tr>
<tr>
<td style="padding:24px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.background};border-radius:12px;">
<tr><td style="padding:20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${infoRow("Ansprechpartner", `${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}`)}
${data.company ? infoRow("Unternehmen", `<strong>${escapeHtml(data.company)}</strong>`) : ""}
${infoRow("E-Mail", `<a href="mailto:${escapeHtml(data.email)}" style="color:${COLORS.blue};">${escapeHtml(data.email)}</a>`)}
${data.phone ? infoRow("Telefon", `<a href="tel:${escapeHtml(data.phone)}" style="color:${COLORS.blue};">${escapeHtml(data.phone)}</a>`) : ""}
${infoRow("Betreff", `<strong style="color:${COLORS.blue};">${escapeHtml(data.subject)}</strong>`, true)}
</table>
</td></tr>
</table>
</td>
</tr>
<tr>
<td style="padding:0 32px 32px 32px;">
<p style="margin:0 0 8px 0;font-size:13px;font-weight:500;color:${COLORS.textSecondary};text-transform:uppercase;letter-spacing:0.5px;">Projektbeschreibung</p>
<div style="background-color:${COLORS.background};border-left:3px solid ${COLORS.blue};padding:16px 20px;border-radius:0 8px 8px 0;">
<p style="margin:0;font-size:14px;color:${COLORS.textPrimary};line-height:1.6;">${escapedMessage}</p>
</div>
</td>
</tr>
`, `Neue Gewerbekunden-Anfrage von ${data.company || data.firstName}`);
};

// ============================================
// USER CONFIRMATION TEMPLATES
// ============================================

const userContactPrivatTemplate = (data: ContactSubmission) => {
  const messagePreview = data.message.length > 200 ? data.message.substring(0, 200) + "..." : data.message;

  return emailWrapper(`
<tr>
<td style="padding:40px 32px 24px 32px;text-align:center;">
<div style="width:64px;height:64px;background:linear-gradient(135deg,${COLORS.blue},${COLORS.blueAccent});border-radius:50%;margin:0 auto 24px auto;line-height:64px;font-size:28px;color:#fff;">&#10003;</div>
<h1 style="margin:0;font-size:24px;font-weight:600;color:${COLORS.textPrimary};">Vielen Dank für Ihre Anfrage, ${escapeHtml(data.firstName)}!</h1>
<p style="margin:16px 0 0 0;font-size:15px;color:${COLORS.textSecondary};line-height:1.6;">Wir haben Ihre Nachricht erhalten und melden uns schnellstmöglich bei Ihnen zurück.</p>
</td>
</tr>
<tr>
<td style="padding:0 32px 24px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.background};border-radius:12px;">
<tr><td style="padding:24px;">
<p style="margin:0 0 16px 0;font-size:13px;font-weight:500;color:${COLORS.textMuted};text-transform:uppercase;letter-spacing:0.5px;">Ihre Anfrage</p>
<p style="margin:0 0 8px 0;font-size:16px;font-weight:500;color:${COLORS.blue};">${escapeHtml(data.subject)}</p>
<p style="margin:0;font-size:14px;color:${COLORS.textSecondary};line-height:1.5;">${escapeHtml(messagePreview)}</p>
</td></tr>
</table>
</td>
</tr>
<tr><td style="padding:0 32px 40px 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,${COLORS.blue}10,${COLORS.blueAccent}10);border:1px solid ${COLORS.blueAccent}40;border-radius:12px;"><tr><td style="padding:20px 24px;"><p style="margin:0 0 4px 0;font-size:14px;font-weight:600;color:${COLORS.textPrimary};">Was passiert als nächstes?</p><p style="margin:0;font-size:13px;color:${COLORS.textSecondary};line-height:1.6;">Unser Team meldet sich innerhalb von 24–48 Stunden bei Ihnen, um Ihr Anliegen zu besprechen. Bei dringenden Fragen erreichen Sie uns telefonisch unter <a href="tel:${COMPANY.phone}" style="color:${COLORS.blue};text-decoration:none;font-weight:500;">${COMPANY.phone}</a>.</p></td></tr></table></td></tr>
`, `Danke für Ihre Anfrage, ${data.firstName}!`);
};

const userContactGewerbeTemplate = (data: ContactSubmission) => {
  const messagePreview = data.message.length > 200 ? data.message.substring(0, 200) + "..." : data.message;

  return emailWrapper(`
<tr>
<td style="padding:40px 32px 24px 32px;text-align:center;">
<div style="width:64px;height:64px;background:linear-gradient(135deg,${COLORS.blueAccent},${COLORS.blue});border-radius:50%;margin:0 auto 24px auto;line-height:64px;font-size:28px;color:#fff;">&#10003;</div>
<h1 style="margin:0;font-size:24px;font-weight:600;color:${COLORS.textPrimary};">Vielen Dank für Ihre Gewerbe-Anfrage!</h1>
<p style="margin:16px 0 0 0;font-size:15px;color:${COLORS.textSecondary};line-height:1.6;">Wir freuen uns über Ihr Interesse an einer Zusammenarbeit mit ${COMPANY.name}.</p>
</td>
</tr>
<tr>
<td style="padding:0 32px 24px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.background};border-radius:12px;">
<tr><td style="padding:24px;">
<p style="margin:0 0 16px 0;font-size:13px;font-weight:500;color:${COLORS.textMuted};text-transform:uppercase;letter-spacing:0.5px;">Ihre Anfrage</p>
<p style="margin:0 0 8px 0;font-size:16px;font-weight:500;color:${COLORS.blue};">${escapeHtml(data.subject)}</p>
<p style="margin:0;font-size:14px;color:${COLORS.textSecondary};line-height:1.5;">${escapeHtml(messagePreview)}</p>
</td></tr>
</table>
</td>
</tr>
<tr><td style="padding:0 32px 40px 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,${COLORS.blueAccent}10,${COLORS.blue}10);border:1px solid ${COLORS.blue}40;border-radius:12px;"><tr><td style="padding:20px 24px;"><p style="margin:0 0 4px 0;font-size:14px;font-weight:600;color:${COLORS.textPrimary};">Nächste Schritte</p><p style="margin:0;font-size:13px;color:${COLORS.textSecondary};line-height:1.6;">Ein Ansprechpartner aus unserem Team meldet sich innerhalb von 24 Stunden, um Ihre Anforderungen im Detail zu besprechen. Telefonisch: <a href="tel:${COMPANY.phone}" style="color:${COLORS.blue};text-decoration:none;font-weight:500;">${COMPANY.phone}</a>.</p></td></tr></table></td></tr>
`, `Danke für Ihre Gewerbe-Anfrage!`);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const smtpPass = Deno.env.get("SMTP_PASS");
    if (!smtpPass) {
      console.error("SMTP_PASS not configured");
      throw new Error("SMTP credentials not configured");
    }

    const data: EmailRequest = await req.json();
    console.log("Received email request:", data.type);

    const client = new SMTPClient({
      connection: {
        hostname: SMTP_HOST,
        port: SMTP_PORT,
        tls: true,
        auth: {
          username: SMTP_USER,
          password: smtpPass,
        },
      },
    });

    let adminSubject: string;
    let adminHtml: string;
    let userSubject: string;
    let userHtml: string;

    if (data.type === "contact") {
      const isPrivate = data.userType === "privat" || data.userType === "bewerber";
      if (isPrivate) {
        adminSubject = `Neue Privatkunden-Anfrage: ${data.subject}`;
        adminHtml = adminContactPrivatTemplate(data);
        userSubject = `Ihre Anfrage bei ${COMPANY.name}`;
        userHtml = userContactPrivatTemplate(data);
      } else {
        adminSubject = `Neue Gewerbekunden-Anfrage: ${data.subject}`;
        adminHtml = adminContactGewerbeTemplate(data);
        userSubject = `Ihre Gewerbe-Anfrage bei ${COMPANY.name}`;
        userHtml = userContactGewerbeTemplate(data);
      }
    } else {
      // Fallback: treat any non-contact as a private contact
      adminSubject = `Neue Anfrage`;
      adminHtml = adminContactPrivatTemplate(data as any);
      userSubject = `Ihre Anfrage bei ${COMPANY.name}`;
      userHtml = userContactPrivatTemplate(data as any);
    }

    console.log("Sending admin notification email...");
    await client.send({
      from: SMTP_USER,
      to: ADMIN_EMAIL,
      subject: adminSubject,
      content: "auto",
      html: adminHtml,
    });

    console.log("Sending user confirmation email...");
    await client.send({
      from: SMTP_USER,
      to: data.email,
      subject: userSubject,
      content: "auto",
      html: userHtml,
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-notification-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
