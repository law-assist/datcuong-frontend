"use server";
import axios from "axios";
import { cookies } from "next/headers";
const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://127.0.0.1:3000";

export const sendReQuest = async (data: any) => {
    const accessToken = cookies().get("access_token")?.value;
    try {
        const res = await axios.post(
            `${API_HOST}/request`,
            {
                ...data,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );
        return res.data;
    } catch (error: any) {
        if (error.message) {
            console.log("error", error.message);
        }
        return;
    }
};

export const getReQuest = async () => {
    const accessToken = cookies().get("access_token")?.value;
    try {
        const res = await axios.get(`${API_HOST}/request/user`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return res.data.data;
    } catch (error: any) {
        if (error.message) {
            console.log("error", error.message);
        }
        return;
    }
};
