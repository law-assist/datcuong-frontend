'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const getFieldById = async (fieldId: string) => {
  const accessToken = cookies().get('access_token')?.value;

  const res = await axios.get(`${API_HOST}/field/${fieldId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status !== 200) {
    throw new Error('Failed to fetch field');
  }

  return res.data;
};
