import Header from "src/components/layout/Header";
import PrivateRoute from "./PrivateRoute";
import Footer from "src/components/layout/Footer";

type HomeLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
    return (
        <PrivateRoute>
            <Header />
            <main className="relative flex min-h-screen flex-col">
                <div className="flex flex-grow">{children}</div>
            </main>
            <Footer />
        </PrivateRoute>
    );
}
