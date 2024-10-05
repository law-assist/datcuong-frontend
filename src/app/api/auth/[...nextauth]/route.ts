/* eslint-disable @typescript-eslint/no-unused-vars */
import { signIn } from "src/app/(auth)/apis/auth.api";
import { getUserProfile } from "src/app/(auth)/apis/user.api";
import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password)
                    return null;
                const { username, password } = credentials;
                const { user } = await signIn(username, password);
                return user;
                return await getUserProfile();
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) token.user = user;

            return token;
        },

        async session({ token, session }: any) {
            console.log("session", session);
            session.user = token.user;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
