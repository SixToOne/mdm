import styled from 'styled-components';

const Header = () => {
    return (
        <StyledHeader>
            <span>ㅁ</span>
            <span style={{ color: '#0064FF' }}>ㄷ</span>
            <span>ㅁ</span>
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    position: sticky;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
`;

export default Header;
