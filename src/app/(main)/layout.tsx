import Header from "src/components/layout/Header";
import PrivateRoute from "./PrivateRoute";
import Footer from "src/components/layout/Footer";

type HomeLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
    return (
        <PrivateRoute>
            <main className="relative flex min-h-screen flex-col">
                <Header />
                <div className="flex-grow px-8 2xl:px-32 bg-violet-100">
                    {children}
                </div>
                <Footer />
            </main>
        </PrivateRoute>
    );
}
