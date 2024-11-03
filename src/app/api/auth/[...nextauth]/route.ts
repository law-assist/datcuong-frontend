/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    handleRefreshToken,
    // handleSignOut,
    signIn,
} from "src/app/(auth)/apis/auth.api";
import { getUserProfile } from "src/app/(auth)/apis/user.api";
import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";

const authOptions: NextAuthOptions = {
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
                    return {
                        id: user._id,
                        name: user.fullName,
                        image: user.avatarUrl,
                        ...user,
                        ...tokens,
                    };
                }
                return null;
                // return await getUserProfile();
            },
        }),
    ],
    session: {
        maxAge: 24 * 60 * 60,
        updateAge: 60 * 60,
    },
    jwt: {
        maxAge: 60 * 60,
    },
    callbacks: {
        async jwt({ token, user, session }: any) {
            if (user) {
                token = await {
                    ...user,
                    ...token,
                    expires: Date.now() + 60 * 60 * 1000,
                };
            }
            const isAccessTokenExpired = Date.now() > token.expires;

            if (isAccessTokenExpired) {
                try {
                    const refreshedTokens = await handleRefreshToken();
                    if (!refreshedTokens) {
                        await signOut({ callbackUrl: "/login" });
                        return;
                    }
                    token.accessToken = refreshedTokens.access_token;
                    token.refreshToken = refreshedTokens.refresh_token;
                    token.expires = Date.now() + 60 * 60 * 1000;
                } catch (error: any) {
                    console.log("error", error.message);
                    await signOut({ callbackUrl: "/login" });
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

const handler: any = NextAuth(authOptions);
export { handler as GET, handler as POST };

// export default NextAuth(authOptions);
