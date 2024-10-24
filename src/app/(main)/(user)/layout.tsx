import Header from "src/components/layout/Header";
import Footer from "src/components/layout/Footer";
import PrivateRoute from "../PrivateRoute";

type HomeLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
    return (
        <PrivateRoute>
            <main className="relative flex min-h-screen flex-col">
                <Header />
                <div className="flex-grow px-8 2xl:px-32 bg-violet-200">
                    {children}
                </div>
                <Footer />
            </main>
        </PrivateRoute>
    );
}
