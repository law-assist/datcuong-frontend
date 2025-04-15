import Header from "src/components/layout/Header";
import PrivateRoute from "./PrivateRoute";
import Footer from "src/components/layout/Footer";

type HomeLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
    return (
        <PrivateRoute>
            <main className="flex flex-col min-h-screen">
                <Header />
                <div className="relative flex-grow flex bg-violet-100/50">
                    {children}
                </div>
                <Footer />
            </main>
        </PrivateRoute>
    );
}
