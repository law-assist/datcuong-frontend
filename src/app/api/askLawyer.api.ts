"use server";
import axios from "axios";
import { cookies } from "next/headers";

const NODE_ENV = process.env.NODE_ENV;
const API_HOST =
    NODE_ENV === "production"
        ? process.env.NEXT_SERVER_API_HOST
        : process.env.API_HOST;


export const sendRequest = async (data: any) => {
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

export const sendResponse = async (id: string, data: any) => {
    const accessToken = cookies().get("access_token")?.value;
    try {
        const res = await axios.post(
            `${API_HOST}/request/response/${id}`,
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
        return {
            message: "error",
        };
    }
};
