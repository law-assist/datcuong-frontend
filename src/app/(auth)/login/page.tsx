import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "XinchaoVietNam - Trang đăng nhập",
    description: "Trang đăng nhập",
};

const LoginPage = async () => {
    const session = await getServerSession();

    if (session?.user) {
        redirect("/home");
    }

    return <LoginForm />;
};
export default LoginPage;
