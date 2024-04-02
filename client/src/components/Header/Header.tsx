import { Link, useLocation } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { SearchGlasses } from '@/components/icons';
import { useState } from 'react';

const event = new Event('uploadArticle');

const Header = () => {
    const theme = useTheme();
    const location = useLocation();
    const [block, setBlock] = useState<boolean>(false);

    return (
        <StyledHeader>
            <SearchKeyword to="/search">
                <SearchGlasses color={theme.DARK_BLACK} />
            </SearchKeyword>
            <AppName to="/">
                <span>ㅁ</span>
                <span style={{ color: theme.PRIMARY }}>ㄷ</span>
                <span>ㅁ</span>
            </AppName>
            <WriteArticle>
                {location.pathname !== '/write' ? (
                    <Link to="/write">글쓰기</Link>
                ) : (
                    <button
                        onClick={() => {
                            setBlock(true);
                            dispatchEvent(event);
                        }}
                        disabled={block}
                    >
                        등록
                    </button>
                )}
            </WriteArticle>
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    position: sticky;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 22px;
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

const WriteArticle = styled.div``;

const SearchKeyword = styled(Link)``;

export default Header;
