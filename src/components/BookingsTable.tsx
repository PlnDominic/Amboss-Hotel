import { getRoom } from '@/data/rooms';
import type { Booking, BookingStatus } from '@/types';
import { removeBooking, setBookingStatus } from '@/app/admin/bookings/actions';

interface BookingsTableProps {
  bookings: Booking[];
}

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function BookingsTable({ bookings }: BookingsTableProps) {
  if (bookings.length === 0) {
    return <p className="text-brand-muted">No bookings yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-brand-line text-left text-brand-muted-2">
            <th className="py-3 pr-4">Reference</th>
            <th className="py-3 pr-4">Guest</th>
            <th className="py-3 pr-4">Room</th>
            <th className="py-3 pr-4">Dates</th>
            <th className="py-3 pr-4">Guests</th>
            <th className="py-3 pr-4">Total</th>
            <th className="py-3 pr-4">Status</th>
            <th className="py-3 pr-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const room = getRoom(booking.roomKey);
            return (
              <tr key={booking.id} className="border-b border-brand-line align-top">
                <td className="py-3 pr-4 font-semibold whitespace-nowrap">{booking.reference}</td>
                <td className="py-3 pr-4">
                  <div className="font-semibold text-brand-ink">{booking.name}</div>
                  <div className="text-xs text-brand-muted-2">{booking.email}</div>
                  <div className="text-xs text-brand-muted-2">{booking.phone}</div>
                </td>
                <td className="py-3 pr-4 whitespace-nowrap">{room.name}</td>
                <td className="py-3 pr-4 whitespace-nowrap">
                  {booking.checkIn} → {booking.checkOut}
                  <div className="text-xs text-brand-muted-2">
                    {booking.nights} night{booking.nights > 1 ? 's' : ''}
                  </div>
                </td>
                <td className="py-3 pr-4">{booking.guests}</td>
                <td className="py-3 pr-4 font-semibold whitespace-nowrap">
                  GHS {booking.totalPrice.toLocaleString()}
                </td>
                <td className="py-3 pr-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[booking.status]}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap gap-2">
                    {booking.status !== 'confirmed' && (
                      <form action={setBookingStatus.bind(null, booking.id, 'confirmed')}>
                        <button
                          type="submit"
                          className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800"
                        >
                          Confirm
                        </button>
                      </form>
                    )}
                    {booking.status !== 'cancelled' && (
                      <form action={setBookingStatus.bind(null, booking.id, 'cancelled')}>
                        <button
                          type="submit"
                          className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-800"
                        >
                          Cancel
                        </button>
                      </form>
                    )}
                    <form action={removeBooking.bind(null, booking.id)}>
                      <button
                        type="submit"
                        className="rounded-full bg-brand-muted-bg px-3 py-1.5 text-xs font-semibold text-brand-ink"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
