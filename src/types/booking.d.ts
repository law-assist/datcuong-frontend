type BookingStatus =
  | 'disabled'
  | 'rejected'
  | 'available'
  | 'accepted'
  | 'booking';

type Booking = {
  id?: string;
  phone?: string;
  fullName?: string;
  startTime?: Date;
  endTime?: Date;
  amount?: number;
  status?: BookingStatus;
};

type BookingResponse = {
  field: Field;
} & Booking;
 interface BookingData {
  id: string;
  phone: string;
  fullName: string;
  fieldId: string;
  startTime: string;
  endTime: string;
  amount: number;
  status: string;
}
