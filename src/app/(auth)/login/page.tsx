// "use client";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
    title: "Law Assistant - Trang đăng nhập",
    description: "Trang đăng nhập",
};

const LoginPage = async () => {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        redirect("/home");
    }

    return <LoginForm />;
};
export default LoginPage;
