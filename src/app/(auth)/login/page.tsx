import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Zodinet Booking - Login Page",
    description: "Zodinet Booking - Login: Login to Your Account",
};

const LoginPage = async () => {
    const session = await getServerSession();
    console.log(session);

    if (session?.user) {
        console.log(session.user);
        redirect("/home");
    }

    return <LoginForm />;
};
export default LoginPage;
