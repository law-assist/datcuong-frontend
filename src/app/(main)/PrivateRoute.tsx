/* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client';
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

type PrivateRouteProps = {
    children: React.ReactNode;
};
const PrivateRoute = async ({ children }: PrivateRouteProps) => {
    const session = await getServerSession();
    console.log(session);

    if (!session?.user) {
        redirect("/login");
    }

    return <>{children}</>;
};
export default PrivateRoute;
