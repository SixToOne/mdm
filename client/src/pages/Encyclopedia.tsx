import { IDic } from '@/apis/types/dictionary';
import { SearchList } from '@/components/EncyclopediaResult';
import { SearchConsonant, SearchKeyword } from '@/components/EncyclopediaSearch';
import { useState } from 'react';

const Encyclopedia = () => {
    const [wordList, setWordList] = useState<IDic[]>([]);
    const [keywordSearched, setKeywordSearched] = useState(false);
    const [consonantSearched, setConsonantSearched] = useState(false);

    return (
        <section>
            <SearchKeyword setSearched={setKeywordSearched} setWordList={setWordList} />
            <SearchConsonant setSearched={setConsonantSearched} />
            {(keywordSearched === true || consonantSearched === true) && (
                <SearchList wordList={wordList} />
            )}
        </section>
    );
};

export default Encyclopedia;
