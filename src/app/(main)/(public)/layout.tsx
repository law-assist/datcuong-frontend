//
import s from "./public.module.scss";
import { cn } from "src/libs/utils";

type HomeLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
    return (
        <div
            className={cn(s.bg, "flex-grow px-4 lg:px-8 xl:px-32 flex w-full")}
        >
            {children}
        </div>
    );
}
