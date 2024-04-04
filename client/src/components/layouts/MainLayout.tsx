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
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.BACKGROUND_LIGHT_GRAY};
`;

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 480px;
    height: calc(100% - 56px);
    padding: 0 22px 18px 22px;
    overflow: scroll;
    background-color: white;
`;

export default MainLayout;
