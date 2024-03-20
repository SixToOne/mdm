import { ReactNode } from 'react';
import styled from 'styled-components';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <StyledMainLayout>
            <Header>ㅁㄷㅁ</Header>
            <Container>{children}</Container>
            <Footer>home</Footer>
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

const Header = styled.div`
    position: sticky;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid gray;
    background-color: aliceblue;
`;

const Footer = styled.div`
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid gray;
    background-color: aliceblue;
`;

export default MainLayout;
