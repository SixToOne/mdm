import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <StyledMainLayout>
            <Header />
            <Container>{children}</Container>
        </StyledMainLayout>
    );
};

const StyledMainLayout = styled.div`
    width: 100vw;
    height: 100vh;
`;

const Container = styled.div`
    width: 100%;
    height: calc(100% - 96px);
    padding: 18px 22px;
    overflow: scroll;
`;

export default MainLayout;
