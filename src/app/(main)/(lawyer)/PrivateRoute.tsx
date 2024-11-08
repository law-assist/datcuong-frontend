/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

type PrivateRouteProps = {
    children: React.ReactNode;
};
const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { data: session } = useSession();
    useEffect(() => {
        if (session?.user.role !== "lawyer") {
            redirect("/home");
        }
    }, [session]);

    return <>{children}</>;
};
export default PrivateRoute;
