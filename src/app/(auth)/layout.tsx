// import AuthHeader from "src/components/auth/AuthHeader";
import Footer from "src/components/layout/Footer";
import s from "./layout.module.scss";
import { cn } from "src/libs/utils";

type AuthLayoutProps = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main
            className={cn(s.auth, "min-h-screen flex flex-col justify-between")}
        >
            {/* <AuthHeader /> */}
            {children}
            <Footer></Footer>
        </main>
    );
}
