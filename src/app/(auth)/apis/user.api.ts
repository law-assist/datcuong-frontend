"use server";
import { cookies } from "next/headers";
// import Cookies from "js-cookie";

const NODE_ENV = process.env.NODE_ENV;
const API_HOST =
    NODE_ENV === "production"
        ? process.env.NEXT_SERVER_API_HOST
        : process.env.API_HOST ;

console.log(API_HOST);

// export const getUserProfile = async () => {
//     const accessToken = cookies().get("access_token")?.value;
//     try {
//         const res = await fetch(`${API_HOST}/user/user-profile`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accessToken}`,
//             },
//             credentials: "include",
//         });
//         const json = await res.json();
//         if (!res.ok) {
//             throw new Error(json.message);
//         }
//         return json.data as User;
//     } catch (error: any) {
//         console.log("error", error.message);
//         return;
//     }
// };

export const updateUserProfile = async (data: User) => {
    console.log(data);
    const accessToken = cookies().get("access_token")?.value;
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
        return;
    }
};
