import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { SearchGlasses } from '@/components/icons';
import { getSearchTags, ITag } from '@/apis/get-seach';
import { useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult';

const Search = () => {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState<string>('');
    const [tags, setTags] = useState<ITag[]>();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword');
    const [searchMode, setSearchMode] = useState<boolean>(true);

    const handleInputKeyword = async () => {
        const { tags } = await getSearchTags(inputValue);
        if (tags) setTags(tags);
    };

    const searchQuizAndMdm = (keyword: string) => {
        navigate(`/search?keyword=${keyword}`);
    };

    useEffect(() => {
        if (keyword) {
            setInputValue(keyword);
            setSearchMode(false);
        }
    }, [keyword]);

    return (
        <StyledSearch>
            <Top>
                <SearchIcon>
                    <SearchGlasses color={theme.LIGHT_BLACK} />
                </SearchIcon>
                <SearchInput
                    type="search"
                    placeholder="검색"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUp={handleInputKeyword}
                />
                <CancelButton>취소</CancelButton>
            </Top>
            {!searchMode ? (
                <SearchResult keyword={keyword as string} />
            ) : (
                <SearchTags>
                    {tags?.map(({ tag, cnt }, index) => (
                        <SearchTag key={index} onClick={() => searchQuizAndMdm(tag)}>
                            <span># {tag}</span>
                            <TagPostCount>게시물 {cnt}개</TagPostCount>
                        </SearchTag>
                    ))}
                </SearchTags>
            )}
        </StyledSearch>
    );
};

const StyledSearch = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`;

const Top = styled.div`
    width: 100%;
    display: flex;
`;

const SearchIcon = styled.div`
    padding: 0 6px 0 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.BACKGROUND_LIGHT_GRAY};
    border-radius: 6px 0 0 6px;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 7px;
    background-color: ${({ theme }) => theme.BACKGROUND_LIGHT_GRAY};
    border-radius: 0 6px 6px 0;
    font-size: 18px;

    &:focus {
        outline: none;
    }
`;

const CancelButton = styled.button`
    padding-left: 10px;
    font-size: 18px;
    white-space: nowrap;
`;

const SearchTags = styled.div`
    width: 100%;
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const SearchTag = styled.button`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    font-weight: 500;
`;

const TagPostCount = styled.span`
    color: ${({ theme }) => theme.LIGHT_BLACK};
    font-size: 14px;
    font-weight: 400;
`;

export default Search;
