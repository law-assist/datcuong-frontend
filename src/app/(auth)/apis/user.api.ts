"use server";
import { cookies } from "next/headers";
// import Cookies from "js-cookie";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://127.0.0.1:3000";
const accessToken = cookies().get("access_token")?.value;

export const getUserProfile = async () => {
    try {
        const res = await fetch(`${API_HOST}/user/user-profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
            cache: "no-cache",
        });
        const json = await res.json();
        if (!res.ok) {
            throw new Error(json.message);
        }
        return json.data as User;
    } catch (error: any) {
        console.log("error", error.message);
    }
};

export const updateUserProfile = async (data: User) => {
    console.log("data", data);
    try {
        const res = await fetch(`${API_HOST}/user/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) {
            throw new Error(json.message);
        }
        return json;
    } catch (error: any) {
        if (error.message) {
            throw new Error(error.message);
        }
    }
};
