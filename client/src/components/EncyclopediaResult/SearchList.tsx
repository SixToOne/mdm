import { useEffect, useState } from 'react';
import { IDic } from '@/apis/types/dictionary';

interface SearchListProps {
    wordList: IDic[];
}

const SearchList = ({ wordList }: SearchListProps) => {
    const [clicked, setClicked] = useState<number[]>([]);

    useEffect(() => {
        setClicked([]);
    }, [wordList]);

    const openDetail = (i: number) => {
        if (clicked.includes(i)) {
            setClicked(clicked.filter((idx) => idx !== i));
        } else {
            setClicked([...clicked, i]);
        }
    };

    return (
        <div className="my-8">
            <div className="font-bold mx-2">총 {wordList.length}개</div>

            <div className="border-t-2 my-8"></div>

            {wordList.map((data, i) => {
                return (
                    <ul
                        key={i}
                        onClick={() => openDetail(i)}
                        className={`font-bold mx-4 my-8 cursor-pointer ${clicked.includes(i) ? 'text-PRIMARY' : ''}`}
                    >
                        {data.title}
                        {data.supNo >= 1 && <sup>{data.supNo}</sup>}

                        {clicked.includes(i) && data.senses.length > 1 && (
                            <ul key={i} className="my-4 p-4 bg-BORDER_LIGHT text-DARK_BLACK">
                                {data.senses.map((each, idx) => {
                                    return (
                                        <ul key={idx} className="my-2">
                                            {each.senseOrder}. {each.definition}
                                        </ul>
                                    );
                                })}
                            </ul>
                        )}

                        {clicked.includes(i) && data.senses.length === 1 && (
                            <ul key={i} className="my-4 p-4 bg-BORDER_LIGHT text-DARK_BLACK">
                                {data.senses.map((each, idx) => {
                                    return <ul key={idx}>{each.definition}</ul>;
                                })}
                            </ul>
                        )}

                        <div className="border-t-2 my-8"></div>
                    </ul>
                );
            })}
        </div>
    );
};

export default SearchList;
