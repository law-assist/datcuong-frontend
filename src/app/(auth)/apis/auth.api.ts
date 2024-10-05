"use server";
import { setCookie } from "src/libs/set-cookie";
import axios from "axios";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://127.0.0.1:5000";
export const signUpUser = async (signUpInfo: any): Promise<any> => {
    try {
        const data = await axios.post(`${API_HOST}/auth/register`, signUpInfo, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return data.data;
    } catch (error: any) {
        return error.response.data;
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

        await cookies().set("access_token", accessToken);
        await cookies().set("refresh_token", refreshToken);

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
    signOut();
};

export const handleRefreshToken = async (refreshToken: string) => {
    "use server";
    const res = await axios.post(
        `${API_HOST}/v1/auth/refresh-token`,
        { refreshToken },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const accessToken = res.data?.access_token;
    await setCookie("access_token", accessToken);
    return res.data;
};

// pages/dashboard.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";

export async function getServerSideProps(context: any) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}
