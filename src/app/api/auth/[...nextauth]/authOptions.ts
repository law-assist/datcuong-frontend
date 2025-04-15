/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";

import { handleSignOut, signIn } from "src/app/(auth)/apis/auth.api";
import { handleRefreshToken } from "../auth.api";

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
                const { user, tokens } = await signIn(username, password);
                if (user) {
                    console.log("user", user);
                    return {
                        id: user._id,
                        name: user.fullName,
                        image: user.avatarUrl,
                        ...user,
                        // ...tokens,
                    };
                }
                return null;
                // throw new Error("Invalid credentials");
                // return await getUserProfile();
            },
        }),
    ],
    session: {
        maxAge: 24 * 60 * 60,
        updateAge: 60 * 15,
    },
    jwt: {
        maxAge: 60 * 15,
    },
    callbacks: {
        async jwt({ token, user, session }: any) {
            if (user) {
                token = await {
                    ...user,
                    ...token,
                    expires: Date.now() + 60 * 55 * 1000,
                };
            }
            const isAccessTokenExpired = Date.now() > token.expires;

            if (isAccessTokenExpired) {
                try {
                    const refreshedTokens = await handleRefreshToken();
                    if (!refreshedTokens) {
                        // await signOut({ callbackUrl: "/login" });
                        await handleSignOut();
                        return;
                    }
                    token.accessToken = refreshedTokens.access_token;
                    token.refreshToken = refreshedTokens.refresh_token;
                    token.expires = Date.now() + 55 * 60 * 1000; // Extend expiration
                } catch (error: any) {
                    console.log("error", error.message);
                    await handleSignOut();
                    return;
                }
            }

            return token;
        },

        async session({ token, session }: any) {
            session.user = await {
                ...session.user,
                ...token,
            };
            return session;
        },
    },
};
