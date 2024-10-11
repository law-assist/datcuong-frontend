"use server";
import { setCookie } from "src/libs/set-cookie";
import axios from "axios";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://127.0.0.1:5000";
export const signUpUser = async (signUpInfo: any): Promise<any> => {
    try {
        const res = await axios.post(`${API_HOST}/auth/register`, signUpInfo, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
        return null;
    }
};
export const signIn = async (username: string, password: string) => {
    try {
        const res = await axios.post(
            `${API_HOST}/auth/login`,
            {
                email: username,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        const accessToken: string = res.data?.data.tokens.accessToken
            ? res.data.data.tokens.accessToken
            : "";

        const refreshToken: string = res.data?.data.tokens.refreshToken
            ? res.data.data.tokens.refreshToken
            : "";

        cookies().set("access_token", accessToken);
        cookies().set("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/",
            sameSite: "strict",
        });

        return res.data.data;
    } catch (error) {
        console.log("error", error);
    }
};

// export const createSocialUser = async (accessToken: string, role: string) => {
//     const res = await axios.post(
//         `${API_HOST}/v1/user/social-login`,
//         {
//             role,
//         },
//         {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         }
//     );

//     return res.data;
// };

export const removeTokens = () => {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
};

export const handleSignOut = () => {
    removeTokens();
    signOut({ callbackUrl: "/" });
};

export const handleRefreshToken = async () => {
    const token = cookies().get("refresh_token")?.value;
    const auth = `Bearer ${token}`;
    console.log("auth", auth);
    try {
        const res = await fetch(`${API_HOST}/auth/refresh-token`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: auth,
            },
            credentials: "include",
            cache: "no-cache",
        });
        const json = await res.json();
        if (!res.ok) {
            throw new Error(json.message);
        }

        const accessToken = json.data?.access_token;
        await setCookie("access_token", accessToken);
        const refreshToken = json.data?.refresh_token;
        await setCookie("refresh_token", refreshToken);
        return json.data;
    } catch (error: any) {
        console.log("refresh token err", error.message);
        return null;
    }
};

// pages/dashboard.js
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "src/app/api/auth/[...nextauth]/route";

// export async function getServerSideProps(context: any) {
//     const session = await getServerSession(
//         context.req,
//         context.res,
//         authOptions
//     );

//     if (!session) {
//         return {
//             redirect: {
//                 destination: "/api/auth/signin",
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: { session },
//     };
// }
