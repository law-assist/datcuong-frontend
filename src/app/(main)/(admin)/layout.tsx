import PrivateRoute from "./PrivateRoute";

type HomeLayoutProps = {
    children: React.ReactNode;
};

export default function AdminLayout({ children }: HomeLayoutProps) {
    return (
        <PrivateRoute>
            <div style={{ backgroundColor: "#ccd4e5" }} className="flex-grow px-4 lg:px-8 xl:px-32 flex w-full py-6">
                {children}
            </div>
        </PrivateRoute>
    );
}