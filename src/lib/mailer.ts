import nodemailer, { type Transporter } from 'nodemailer';
import { getRoom } from '@/data/rooms';
import type { Booking } from '@/types';

let cachedTransport: Transporter | null = null;

function getTransport(): { transport: Transporter; user: string } | null {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  if (!cachedTransport) {
    cachedTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  return { transport: cachedTransport, user };
}

const BRAND_ACCENT = '#b3202f';
const BRAND_INK = '#14110f';
const BRAND_LINE = '#e5e0da';
const BRAND_MUTED = '#6b6560';
const SERIF = "Georgia,'Times New Roman',Times,serif";
const SANS = "Helvetica,Arial,sans-serif";
const LOGO_CID = 'anboss-hotel-logo';

let logoBufferPromise: Promise<Buffer | null> | null = null;

/**
 * Fetches the hotel logo once per warm server instance and caches the
 * result (including in-flight dedup for concurrent first calls), so a
 * transient fetch failure can only ever affect the logo, never abort the
 * email send itself. Previously each send fetched the logo live inside
 * nodemailer's own attachment handling — if that fetch failed, the whole
 * sendMail call threw and was silently swallowed by the caller's catch
 * block, so one email could go out while its twin silently vanished.
 */
function getLogoBuffer(origin: string): Promise<Buffer | null> {
  if (!logoBufferPromise) {
    logoBufferPromise = fetch(`${origin}/anboss-hotel-logo.png`)
      .then((res) => (res.ok ? res.arrayBuffer().then((buf) => Buffer.from(buf)) : null))
      .catch((error) => {
        console.error('Failed to fetch hotel logo for email attachment:', error);
        return null;
      });
  }
  return logoBufferPromise;
}

async function logoAttachments(origin: string) {
  const buffer = await getLogoBuffer(origin);
  if (!buffer) return [];
  return [{ filename: 'anboss-hotel-logo.png', content: buffer, cid: LOGO_CID }];
}

function renderDetailRows(rows: Array<[string, string]>): string {
  return rows
    .map(
      ([label, value], index) => `
        <tr>
          <td style="padding:${index === 0 ? '0 0 13px' : '13px 0'};border-top:${index === 0 ? 'none' : `1px solid ${BRAND_LINE}`};font-family:${SANS};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND_MUTED};white-space:nowrap;vertical-align:top;width:120px">${label}</td>
          <td style="padding:${index === 0 ? '0 0 13px' : '13px 0'};border-top:${index === 0 ? 'none' : `1px solid ${BRAND_LINE}`};font-family:${SANS};font-size:14px;font-weight:700;color:${BRAND_INK};vertical-align:top">${value}</td>
        </tr>`,
    )
    .join('');
}

function renderReferenceBadge(reference: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 26px">
      <tr>
        <td bgcolor="#fbf3f3" style="background-color:#fbf3f3;border-left:3px solid ${BRAND_ACCENT};padding:16px 20px">
          <div style="font-family:${SANS};font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND_MUTED}">
            Reservation Reference
          </div>
          <div style="margin-top:4px;font-family:${SANS};font-size:20px;font-weight:800;letter-spacing:0.04em;color:${BRAND_INK}">
            ${reference}
          </div>
        </td>
      </tr>
    </table>`;
}

function renderEmailDocument(options: { previewText: string; eyebrow: string; heading: string; bodyHtml: string }): string {
  const { previewText, eyebrow, heading, bodyHtml } = options;
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>Anboss Hotel</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f0ee" bgcolor="#f2f0ee">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:#f2f0ee">${previewText}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f2f0ee" style="background-color:#f2f0ee">
    <tr>
      <td align="center" style="padding:36px 16px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff" bgcolor="#ffffff">
          <tr>
            <td bgcolor="${BRAND_ACCENT}" style="background-color:${BRAND_ACCENT};height:4px;line-height:4px;font-size:0">&nbsp;</td>
          </tr>
          <tr>
            <td align="center" bgcolor="${BRAND_INK}" style="background-color:${BRAND_INK};padding:34px 32px 28px">
              <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="background-color:#ffffff;margin:0 auto" bgcolor="#ffffff">
                <tr>
                  <td style="padding:14px 22px">
                    <img src="cid:${LOGO_CID}" width="150" alt="Anboss Hotel" style="display:block;height:auto;border:0;outline:none" />
                  </td>
                </tr>
              </table>
              <div style="margin-top:16px;font-family:${SANS};font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:#c9c2b8">
                Santasi Apre &middot; Kumasi &middot; Ghana
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:38px 36px 6px">
              <div style="font-family:${SANS};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${BRAND_ACCENT};font-weight:700">
                ${eyebrow}
              </div>
              <div style="margin-top:12px;font-family:${SERIF};font-size:27px;font-weight:700;color:${BRAND_INK};line-height:1.3">
                ${heading}
              </div>
              <div style="margin:18px auto 0;width:44px;height:2px;background-color:${BRAND_ACCENT}" bgcolor="${BRAND_ACCENT}">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 36px 8px">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="${BRAND_INK}" style="background-color:${BRAND_INK};padding:28px 32px">
              <div style="font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:0.1em;color:#ffffff">
                ANBOSS HOTEL
              </div>
              <div style="margin-top:10px;font-family:${SANS};font-size:12px;color:#e6ded5;line-height:1.8">
                0244 066999 &middot; 0201 185123 &middot; 0241 878537<br />
                info@anbosshotel.com
              </div>
            </td>
          </tr>
        </table>
        <div style="max-width:560px;margin:18px auto 0;font-family:${SANS};font-size:11px;color:#a39c93">
          Developed by Ecstasy Technologies
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Emails a booking notification to the hotel's Gmail inbox. Requires
 * GMAIL_USER (a Gmail address) and GMAIL_APP_PASSWORD (a 16-character Gmail
 * App Password, not the account password — see README) to be set. Silently
 * no-ops with a console warning if either is missing, so booking creation
 * never fails because of email delivery.
 */
export async function sendBookingNotificationEmail(booking: Booking, origin: string): Promise<void> {
  const config = getTransport();
  if (!config) {
    console.warn(
      'Booking email skipped: set GMAIL_USER and GMAIL_APP_PASSWORD environment variables to enable email notifications.',
    );
    return;
  }

  const { transport, user } = config;
  const room = getRoom(booking.roomKey);
  const to = process.env.BOOKING_NOTIFICATION_EMAIL || user;

  const subject = `New booking ${booking.reference} — ${room.name}`;

  const rows: Array<[string, string]> = [
    ['Room', room.name],
    ['Guest', booking.name],
    ['Email', booking.email],
    ['Phone', booking.phone],
    ['Check-in', booking.checkIn],
    ['Check-out', booking.checkOut],
    ['Nights', String(booking.nights)],
    ['Guests', String(booking.guests)],
    ['Total', `GHS ${booking.totalPrice.toLocaleString()}`],
    ...(booking.message ? [['Message', booking.message] as [string, string]] : []),
  ];

  const bodyHtml = `
    <p style="margin:0 0 22px;font-family:${SANS};font-size:14px;color:${BRAND_MUTED};line-height:1.6">
      A new booking has been received on the Anboss Hotel website.
    </p>
    ${renderReferenceBadge(booking.reference)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${renderDetailRows(rows)}
    </table>
    <p style="margin:22px 0 0;font-family:${SANS};font-size:12px;color:${BRAND_MUTED}">
      Submitted ${booking.createdAt}
    </p>`;

  const html = renderEmailDocument({
    previewText: `New booking ${booking.reference} for ${room.name} — GHS ${booking.totalPrice.toLocaleString()}`,
    eyebrow: 'Booking Notification',
    heading: 'New booking received',
    bodyHtml,
  });

  const text = [
    'A new booking has been received on the Anboss Hotel website.',
    '',
    `Reference: ${booking.reference}`,
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    `Submitted: ${booking.createdAt}`,
  ].join('\n');

  try {
    await transport.sendMail({
      from: `"Anboss Hotel Bookings" <${user}>`,
      to,
      subject,
      text,
      html,
      attachments: await logoAttachments(origin),
    });
  } catch (error) {
    console.error(`Failed to send booking notification email to ${to}:`, error);
  }
}

/**
 * Emails a booking confirmation to the guest who made the booking. Silently
 * no-ops (with a console warning) under the same conditions as
 * sendBookingNotificationEmail — see that function's doc comment.
 */
export async function sendBookingConfirmationEmail(booking: Booking, origin: string): Promise<void> {
  const config = getTransport();
  if (!config) {
    console.warn(
      'Guest confirmation email skipped: set GMAIL_USER and GMAIL_APP_PASSWORD environment variables to enable email notifications.',
    );
    return;
  }

  const { transport, user } = config;
  const room = getRoom(booking.roomKey);
  const subject = `Your Anboss Hotel booking is confirmed — ${booking.reference}`;

  const rows: Array<[string, string]> = [
    ['Room', room.name],
    ['Check-in', booking.checkIn],
    ['Check-out', booking.checkOut],
    ['Nights', String(booking.nights)],
    ['Guests', String(booking.guests)],
    ['Total', `GHS ${booking.totalPrice.toLocaleString()}`],
  ];

  const bodyHtml = `
    <p style="margin:0 0 22px;font-family:${SANS};font-size:14px;color:${BRAND_MUTED};line-height:1.6">
      Dear ${booking.name}, thank you for choosing Anboss Hotel. Your reservation request has
      been received and is being processed.
    </p>
    ${renderReferenceBadge(booking.reference)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${renderDetailRows(rows)}
    </table>
    <div style="margin:26px 0 0;border-top:1px solid ${BRAND_LINE};padding-top:20px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:0 0 10px;font-family:${SANS};font-size:13px;color:${BRAND_MUTED};line-height:1.6">
            &middot;&nbsp; Standard check-out time is 12:00 PM (unless late check-out is requested)
          </td>
        </tr>
        <tr>
          <td style="padding:0 0 10px;font-family:${SANS};font-size:13px;color:${BRAND_MUTED};line-height:1.6">
            &middot;&nbsp; Payment is made at check-in &mdash; no advance deposit is required
          </td>
        </tr>
        <tr>
          <td style="font-family:${SANS};font-size:13px;color:${BRAND_MUTED};line-height:1.6">
            &middot;&nbsp; For any changes or questions, contact us at 0244 066999
          </td>
        </tr>
      </table>
    </div>`;

  const html = renderEmailDocument({
    previewText: `Your reservation ${booking.reference} at Anboss Hotel is confirmed for ${booking.checkIn}.`,
    eyebrow: 'Booking Confirmation',
    heading: 'Your reservation is confirmed',
    bodyHtml,
  });

  const text = [
    `Dear ${booking.name}, thank you for choosing Anboss Hotel. Your reservation request has been received and is being processed.`,
    '',
    `Reference: ${booking.reference}`,
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Standard check-out time is 12:00 PM (unless late check-out is requested).',
    'Payment is made at check-in — no advance deposit is required.',
    'For any changes or questions, contact us at 0244 066999.',
  ].join('\n');

  try {
    await transport.sendMail({
      from: `"Anboss Hotel" <${user}>`,
      to: booking.email,
      subject,
      text,
      html,
      attachments: await logoAttachments(origin),
    });
  } catch (error) {
    console.error(`Failed to send booking confirmation email to ${booking.email}:`, error);
  }
}
