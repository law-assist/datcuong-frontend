type Field = {
  id: string;
  name: string;
  sportFieldId?: string;
  bookings?: Booking[];
};

type FieldResponse = {
  sportField: SportField;
} & Field;