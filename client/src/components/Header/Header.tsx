import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
    return (
        <StyledHeader>
            <AppName to="/">
                <span>ㅁ</span>
                <span style={{ color: '#0064FF' }}>ㄷ</span>
                <span>ㅁ</span>
            </AppName>
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    position: sticky;
    width: 100%;
    height: 56px;
    background-color: white;
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
