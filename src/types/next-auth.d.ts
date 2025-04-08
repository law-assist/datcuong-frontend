/* eslint-disable @typescript-eslint/no-unused-vars */
// next-auth.d.ts
"use server";
import NextAuth from "next-auth";
import { DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
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
    export interface Session {
        user: User;
        token: string;
        expires: ISODateString;
    }

    declare interface DefaultSession {
        user: User;
        expires: ISODateString;
    }
}
