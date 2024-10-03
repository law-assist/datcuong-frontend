// utils/groupBookingsByDay.ts

import moment from 'moment';

interface BookingsGroupedByDay {
  [date: string]: any[];
}

export const groupBookingsByDay = (bookings: any[]): BookingsGroupedByDay => {
  if (bookings?.length === 0 || !bookings) {
    return {};
  }

  return bookings.reduce((groupedBookings, booking) => {
    const date = moment(booking.startTime).local().format('DD/MM/YYYY');
    if (!groupedBookings[date]) {
      groupedBookings[date] = [];
    }
    groupedBookings[date].push(booking);
    return groupedBookings;
  }, {} as BookingsGroupedByDay);
};
