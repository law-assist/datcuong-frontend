import { CreateBookingByOwnerDto } from '@/app/(owner)/owner/field-map/table-booking/api/booking';
import axiosInstance from '../axios';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const createBookingByOwner = async (
  createBookingByOwnerDto: CreateBookingByOwnerDto,
) => {
  const response = await axiosInstance.post(
    `${API_HOST}/booking/owner`,
    createBookingByOwnerDto,
  );
  return response;
};

export const createBookingByUser = async (
  fieldId: string,
  startTime: string,
  endTime: string,
  amount: number,
) => {
  const response = await axiosInstance.post(`${API_HOST}/booking`, {
    fieldId,
    startTime,
    endTime,
    amount,
  });
  return response;
};

export const validateBookingTime = async (
  fieldId: string,
  startTime: string,
  endTime: string,
) => {
  const response = await axiosInstance.get(`${API_HOST}/booking/validate`, {
    params: {
      fieldId,
      startTime,
      endTime,
    },
  });
  return response;
};