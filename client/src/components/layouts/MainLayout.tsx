import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
// import { WriteRequest } from '@/apis/types/post-newMDM';

interface MainLayoutProps {
    children: ReactNode;
    // writtenData?: WriteRequest;
}

// const MainLayout = ({ children, writtenData }: MainLayoutProps) => {
const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <StyledMainLayout>
            {/* <Header writtenData={writtenData} /> */}
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
    height: calc(100% - 56px);
    padding: 0 22px 18px 22px;
    overflow: scroll;
`;

export default MainLayout;
