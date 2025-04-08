import PrivateRoute from "./PrivateRoute";

type HomeLayoutProps = {
    children: React.ReactNode;
};

export default function AdminLayout({ children }: HomeLayoutProps) {
    return <PrivateRoute>{children}</PrivateRoute>;
}
