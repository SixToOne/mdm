import { IDic } from '@/apis/types/dictionary';
import { SearchList } from '@/components/EncyclopediaResult';
import { SearchKeyword } from '@/components/EncyclopediaSearch';
import { useState } from 'react';

const Encyclopedia = () => {
    const [wordList, setWordList] = useState<IDic[]>([]);
    const [keywordSearched, setKeywordSearched] = useState(false);

    return (
        <section>
            <SearchKeyword setSearched={setKeywordSearched} setWordList={setWordList} />
            {keywordSearched === true && <SearchList wordList={wordList} />}
        </section>
    );
};

export default Encyclopedia;
