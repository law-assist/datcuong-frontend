type HomeLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
    return (
        <div className="flex flex-grow px-4 lg:px-8 xl:px-32 bg-violet-100 w-full">
            {children}
        </div>
    );
}
