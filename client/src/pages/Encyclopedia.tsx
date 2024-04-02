import { IDic } from '@/apis/types/dictionary';
import { SearchList } from '@/components/EncyclopediaResult';
import { SearchKeyword } from '@/components/EncyclopediaSearch';
import { useState } from 'react';

const Encyclopedia = () => {
    const [wordList, setWordList] = useState<IDic[]>([]);
    const [keywordSearched, setKeywordSearched] = useState(false);

    return (
        <section>
            <div className="text-PRIMARY text-center font-bold text-2xl my-4">금융용어 사전</div>
            <SearchKeyword setSearched={setKeywordSearched} setWordList={setWordList} />
            {keywordSearched === true && <SearchList wordList={wordList} />}
        </section>
    );
};

export default Encyclopedia;
