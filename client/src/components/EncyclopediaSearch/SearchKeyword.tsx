import { Dispatch, SetStateAction, useState } from 'react';
import { SearchGlasses } from '@/components/icons';
import styled, { useTheme } from 'styled-components';
import { getDictionaryKeyword } from '@/apis/get-dictionary-keyword';
import { IDic } from '@/apis/types/dictionary';

export interface SearchProps {
    setSearched: Dispatch<SetStateAction<boolean>>;
    setWordList: Dispatch<SetStateAction<IDic[]>>;
}

const SearchKeyword = ({ setSearched, setWordList }: SearchProps) => {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputKeyword = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputValue === '') {
                setSearched(false);
            } else {
                setSearched(true);
                const res = await getDictionaryKeyword(inputValue);
                if (res) {
                    setWordList(res);
                }
            }
        }
    };

    return (
        <div className="flex my-4 border-2 border-PRIMARY rounded-full p-2">
            <SearchIcon>
                <SearchGlasses color={theme.LIGHT_BLACK} />
            </SearchIcon>
            <SearchInput
                type="text"
                placeholder="궁금한 금융용어를 입력하세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={handleInputKeyword}
            />
        </div>
    );
};

const SearchIcon = styled.div`
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 6px 6px 0;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 2px;
    border: none;
    border-radius: 6px 0 0 6px;
    font-size: 18px;
    outline: none;
`;

export default SearchKeyword;
