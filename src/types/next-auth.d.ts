/* eslint-disable @typescript-eslint/no-unused-vars */
// next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
    declare interface DefaultUser {
        _id: string;
        fullName: string;
        email: string;
        role: string;
        phoneNumber: string;
        status: string;
        field: string[];
        avatarUrl: string;
        accessToken: string;
        refreshToken: string;
    }
    interface Session {
        user: DefaultUser;
        token: string;
        expires: Date;
    }
}
