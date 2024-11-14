"use client";
import axios from "axios";
// import { cookies } from "next/headers";
import Cookies from "js-cookie";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST ?? "http://localhost:5000";

export const sendRequest = async (data: any) => {
    // const accessToken = cookies().get("access_token")?.value;
    const accessToken = Cookies.get("access_token");
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
    // const accessToken = cookies().get("access_token")?.value;
    const accessToken = Cookies.get("access_token");
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

export const getReQuest = async () => {
    // const accessToken = cookies().get("access_token")?.value;
    const accessToken = Cookies.get("access_token");
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
        return {
            message: "error",
        };
    }
};
