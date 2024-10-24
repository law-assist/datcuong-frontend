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
                        _id: user._id,
                        fullName: user.fullName,
                        name: user.fullName,
                        email: user.email,
                        image: user.avatarUrl,
                        role: user.role,
                        phoneNumber: user.phoneNumber,
                        status: user.status,
                        field: user.field,
                        avatarUrl: user.avatarUrl,
                        accessToken: tokens.accessToken,
                        refreshToken: tokens.refreshToken,
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
        async jwt({ token, user }: any) {
            if (user) {
                token.user = user;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.expires = Date.now() + 60 * 60 * 1000;
            }
            const isAccessTokenExpired = Date.now() > token.expires;

            if (isAccessTokenExpired) {
                try {
                    const refreshedTokens = await handleRefreshToken();
                    if (!refreshedTokens) {
                        signOut({ callbackUrl: "/login" });
                        return;
                    }
                    token.accessToken = refreshedTokens.access_token;
                    token.refreshToken = refreshedTokens.refresh_token;
                    token.expires = Date.now() + 60 * 60 * 1000;
                } catch (error: any) {
                    console.log("error", error.message);
                    signOut({ callbackUrl: "/login" });
                }
            }

            return token;
        },

        async session({ token, session }: any) {
            session.user = token.user;
            session.token = token.accessToken;
            return session;
        },
    },
};

const handler: any = NextAuth(authOptions);
export { handler as GET, handler as POST };

// export default NextAuth(authOptions);
