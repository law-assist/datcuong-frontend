type HomeLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
    return (
        <div className="flex-grow px-8 2xl:px-32 bg-violet-200">{children}</div>
    );
}
