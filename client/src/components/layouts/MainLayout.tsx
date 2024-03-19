import { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return <div className="w-screen h-screen">{children}</div>;
};

export default MainLayout;
