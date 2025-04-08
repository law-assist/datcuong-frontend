import PrivateRoute from "./PrivateRoute";

type HomeLayoutProps = {
    children: React.ReactNode;
};

export default function LawyerLayout({ children }: HomeLayoutProps) {
    return (
        <PrivateRoute>
            <div className="flex flex-grow px-4 lg:px-8 xl:px-32 bg-slate-100">
                {children}
            </div>
        </PrivateRoute>
    );
}
