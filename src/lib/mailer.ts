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

/**
 * Emails a booking notification to the hotel's Gmail inbox. Requires
 * GMAIL_USER (a Gmail address) and GMAIL_APP_PASSWORD (a 16-character Gmail
 * App Password, not the account password — see README) to be set. Silently
 * no-ops with a console warning if either is missing, so booking creation
 * never fails because of email delivery.
 */
export async function sendBookingNotificationEmail(booking: Booking): Promise<void> {
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

  const lines = [
    'A new booking has been received on the Anboss Hotel website.',
    '',
    `Reference: ${booking.reference}`,
    `Room: ${room.name}`,
    `Guest: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Check-in: ${booking.checkIn}`,
    `Check-out: ${booking.checkOut}`,
    `Nights: ${booking.nights}`,
    `Guests: ${booking.guests}`,
    `Total: GHS ${booking.totalPrice.toLocaleString()}`,
    booking.message ? `Message: ${booking.message}` : null,
    '',
    `Submitted: ${booking.createdAt}`,
  ].filter((line): line is string => line !== null);

  const rows = [
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
    ...(booking.message ? [['Message', booking.message]] : []),
  ];

  const html = `
    <h2 style="font-family:sans-serif">New booking received</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows.map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`).join('')}
    </table>
  `;

  try {
    await transport.sendMail({
      from: `"Anboss Hotel Bookings" <${user}>`,
      to,
      subject,
      text: lines.join('\n'),
      html,
    });
  } catch (error) {
    console.error('Failed to send booking notification email:', error);
  }
}
