import PrivateRoute from "./PrivateRoute";

type HomeLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
    return (
        <PrivateRoute>
            <div className="flex flex-grow px-8 2xl:px-32 bg-slate-100">
                {children}
            </div>
        </PrivateRoute>
    );
}
