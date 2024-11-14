// 'use client';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

type PrivateRouteProps = {
    children: React.ReactNode;
};
const PrivateRoute = async ({ children }: PrivateRouteProps) => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login");
    }

    return <>{children}</>;
};
export default PrivateRoute;
