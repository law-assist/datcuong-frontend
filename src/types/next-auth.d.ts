/* eslint-disable @typescript-eslint/no-unused-vars */
// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            _id: string;
            fullName: string;
            email: string;
            role: string;
            phoneNumber: string;
            status: string;
            field: string[];
            avatarUrl: string;
        };
        token: string;
    }
}
