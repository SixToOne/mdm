import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// /mdm/1 -> mdm
export const getPath = (location: string): string => {
    return location.split('/')[1];
};

const RightButton = () => {
    const location = useLocation();
    const uploadArticle = () => {};

    if (getPath(location.pathname) !== 'write') {
        return <Link to="/write">글쓰기</Link>;
    } else {
        return <button onClick={uploadArticle}>등록</button>;
    }
};

const Header = () => {
    return (
        <StyledHeader>
            <AppName to="/">
                <span>ㅁ</span>
                <span style={{ color: '#0064FF' }}>ㄷ</span>
                <span>ㅁ</span>
            </AppName>
            <RightButton />
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    position: sticky;
    width: 100%;
    height: 48px;
`;

const AppName = styled(Link)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: bold;
`;

export default Header;
