import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { SearchGlasses } from '@/components/icons';
import { getSearchTags } from '@/apis/get-seach-tags';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState<string>('');
    const [tags, setTags] = useState<string[]>();
    const navigate = useNavigate();

    const handleInputKeyword = async () => {
        const data = await getSearchTags(inputValue);
        if (data) {
            setTags(data.tags);
        }
    };

    const searchQuizAndMdm = (keyword: string) => {
        navigate(`/search?keyword=${keyword}`);
    };

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
            <SearchTags>
                {tags?.map((tag, index) => (
                    <SearchTag key={index} onClick={() => searchQuizAndMdm(tag)}>
                        <span># {tag}</span>
                    </SearchTag>
                ))}
            </SearchTags>
        </StyledSearch>
    );
};

const StyledSearch = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
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
    align-items: center;
    gap: 5px;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

export default Search;
