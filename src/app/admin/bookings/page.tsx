import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSessionCookieName, getSessionToken } from '@/lib/admin-auth';
import { readBookings } from '@/lib/bookings';
import BookingsTable from '@/components/BookingsTable';

export default async function AdminBookingsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(getSessionCookieName())?.value;

  if (session !== getSessionToken()) {
    redirect('/admin/login');
  }

  const bookings = readBookings()
    .slice()
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <main className="mx-auto max-w-[1180px] px-12 py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="font-display text-[32px] font-extrabold text-brand-ink">Bookings</div>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="rounded-full bg-brand-muted-bg px-5 py-2.5 text-sm font-semibold text-brand-ink"
          >
            Log out
          </button>
        </form>
      </div>
      <BookingsTable bookings={bookings} />
    </main>
  );
}
