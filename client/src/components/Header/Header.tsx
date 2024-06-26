import { Link, useLocation } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { Dictionary, SearchGlasses } from '@/components/icons';
import { useState } from 'react';

const event = new Event('uploadArticle');

const Header = () => {
    const theme = useTheme();
    const location = useLocation();
    const [block, setBlock] = useState<boolean>(false);

    return (
        <StyledHeader>
            <SearchGroup>
                <SearchKeyword to="/search">
                    <SearchGlasses color={theme.DARK_BLACK} />
                </SearchKeyword>
                <SearchDic to="/financialdic">
                    <Dictionary color={theme.DARK_BLACK} />
                </SearchDic>
            </SearchGroup>
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
    max-width: 480px;
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

const SearchGroup = styled.div`
    display: flex;
    align-items: center;
`;

const SearchKeyword = styled(Link)`
    display: inline-block;
    padding-right: 20px;
`;

const SearchDic = styled(Link)`
    display: inline-block;
`;

export default Header;
