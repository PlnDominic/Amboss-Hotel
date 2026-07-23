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
const BRAND_LINE = '#ececec';
const BRAND_MUTED = '#6b6560';
const LOGO_CID = 'anboss-hotel-logo';

function logoAttachment(origin: string) {
  return {
    filename: 'anboss-hotel-logo.png',
    path: `${origin}/anboss-hotel-logo.png`,
    cid: LOGO_CID,
  };
}

function renderRows(rows: Array<[string, string]>): string {
  return rows
    .map(
      ([label, value], index) => `
        <tr style="background:${index % 2 === 0 ? '#ffffff' : '#faf9f8'}">
          <td style="padding:11px 16px;font-size:13px;color:${BRAND_MUTED};border-bottom:1px solid ${BRAND_LINE};white-space:nowrap">${label}</td>
          <td style="padding:11px 16px;font-size:13px;font-weight:700;color:${BRAND_INK};border-bottom:1px solid ${BRAND_LINE}">${value}</td>
        </tr>`,
    )
    .join('');
}

function renderEmailShell(options: { eyebrow: string; heading: string; bodyHtml: string }): string {
  const { eyebrow, heading, bodyHtml } = options;
  return `
  <div style="background:#f4f4f4;padding:32px 16px;font-family:'Helvetica Neue',Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid ${BRAND_LINE}">
      <tr>
        <td style="background:${BRAND_INK};padding:28px 32px;text-align:center">
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;background:#ffffff">
            <tr>
              <td style="padding:12px 18px">
                <img src="cid:${LOGO_CID}" alt="Anboss Hotel" width="140" style="display:block;height:auto" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:36px 32px 8px">
          <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND_ACCENT};font-weight:700;margin-bottom:8px">
            ${eyebrow}
          </div>
          <div style="font-size:22px;font-weight:800;color:${BRAND_INK};line-height:1.3">
            ${heading}
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px 32px">
          ${bodyHtml}
        </td>
      </tr>
      <tr>
        <td style="background:${BRAND_INK};padding:24px 32px;text-align:center">
          <div style="font-size:12px;color:#e6ded5;line-height:1.7">
            Anboss Hotel &middot; Santasi Apre, Kumasi, Ghana<br />
            0244 066999 &middot; 0201 185123 &middot; 0241 878537<br />
            info@anbosshotel.com
          </div>
        </td>
      </tr>
    </table>
  </div>`;
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
    ['Reference', booking.reference],
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
    <p style="font-size:14px;color:${BRAND_MUTED};line-height:1.6;margin:0 0 20px">
      A new booking has been received on the Anboss Hotel website.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND_LINE}">
      ${renderRows(rows)}
    </table>
    <p style="font-size:12px;color:${BRAND_MUTED};margin:20px 0 0">
      Submitted: ${booking.createdAt}
    </p>`;

  const html = renderEmailShell({
    eyebrow: 'Booking Notification',
    heading: 'New booking received',
    bodyHtml,
  });

  const text = [
    'A new booking has been received on the Anboss Hotel website.',
    '',
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
      attachments: [logoAttachment(origin)],
    });
  } catch (error) {
    console.error('Failed to send booking notification email:', error);
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
    ['Reference', booking.reference],
    ['Room', room.name],
    ['Check-in', booking.checkIn],
    ['Check-out', booking.checkOut],
    ['Nights', String(booking.nights)],
    ['Guests', String(booking.guests)],
    ['Total', `GHS ${booking.totalPrice.toLocaleString()}`],
  ];

  const bodyHtml = `
    <p style="font-size:14px;color:${BRAND_MUTED};line-height:1.6;margin:0 0 20px">
      Dear ${booking.name}, thank you for choosing Anboss Hotel. Your reservation request has
      been received and is being processed.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND_LINE}">
      ${renderRows(rows)}
    </table>
    <ul style="margin:20px 0 0;padding-left:18px;font-size:13px;color:${BRAND_MUTED};line-height:1.7">
      <li>Standard check-out time is 12:00 PM (unless late check-out is requested).</li>
      <li>Payment is made at check-in — no advance deposit is required.</li>
      <li>For any changes or questions, contact us at 0244 066999.</li>
    </ul>`;

  const html = renderEmailShell({
    eyebrow: 'Booking Confirmation',
    heading: 'Your reservation is confirmed',
    bodyHtml,
  });

  const text = [
    `Dear ${booking.name}, thank you for choosing Anboss Hotel. Your reservation request has been received and is being processed.`,
    '',
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
      attachments: [logoAttachment(origin)],
    });
  } catch (error) {
    console.error('Failed to send booking confirmation email:', error);
  }
}
