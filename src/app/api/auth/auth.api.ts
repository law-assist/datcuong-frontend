"use server";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/authOptions";

const NODE_ENV = process.env.NODE_ENV;
const API_HOST =
    NODE_ENV === "production"
        ? process.env.NEXT_SERVER_API_HOST
        : process.env.BACKEND_API_HOST ??
          process.env.NEXT_PUBLIC_API_HOST ??
          process.env.API_HOST;

export const handleRefreshToken = async () => {
    try {
        const token = cookies().get("refresh_token")?.value;
        const auth = `Bearer ${token}`;
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

        const accessToken = json.data?.accessToken;
        const refreshToken = json.data?.refreshToken;
        await cookies().set("access_token", accessToken, {
            maxAge: 60 * 60,
        });
        await cookies().set("refresh_token", refreshToken, {
            // httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/",
            sameSite: "strict",
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    } catch (error: any) {
        console.log("refresh token err", error.message);
        return null;
    }
};

export async function getServerSideProps() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}
