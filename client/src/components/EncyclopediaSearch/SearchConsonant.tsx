import { Dispatch, SetStateAction, useState } from 'react';

export interface SearchProps {
    setSearched: Dispatch<SetStateAction<boolean>>;
}

const SearchConsonant = ({ setSearched }: SearchProps) => {
    const [selected, setSelected] = useState<string>('');

    const handleClick = async (which: string) => {
        setSelected(which);
        setSearched(true);
    };

    return (
        <>
            <div className="mx-6 my-2 font-bold text-PRIMARY">한글</div>
            <div className="flex px-4 justify-around py-1">
                <button
                    className={`px-2 py-1 ${selected === 'ㄱ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㄱ')}
                >
                    ㄱ
                </button>
                <button
                    className={`px-2 py-1 ${selected === 'ㄴ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㄴ')}
                >
                    ㄴ
                </button>
                <button
                    className={`px-2 py-1 ${selected === 'ㄷ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㄷ')}
                >
                    ㄷ
                </button>
                <button
                    className={`px-2 py-1 ${selected === 'ㄹ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㄹ')}
                >
                    ㄹ
                </button>
                <button
                    className={`px-2 py-1 ${selected === 'ㅁ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㅁ')}
                >
                    ㅁ
                </button>
                <button
                    className={`px-2 py-1 ${selected === 'ㅂ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㅂ')}
                >
                    ㅂ
                </button>
                <button
                    className={`px-2 py-1 ${selected === 'ㅅ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㅅ')}
                >
                    ㅅ
                </button>
            </div>
            <div className="flex px-4 justify-around py-1">
                <button
                    className={`px-2 py-1 ${selected === 'ㅇ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㅇ')}
                >
                    ㅇ
                </button>
                <button
                    className={`px-2 py-1 ${selected === 'ㅈ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㅈ')}
                >
                    ㅈ
                </button>
                <button
                    className={`px-2 py-1 ${selected === 'ㅊ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㅊ')}
                >
                    ㅊ
                </button>
                <button
                    className={`px-2 py-1 ${selected === 'ㅋ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㅋ')}
                >
                    ㅋ
                </button>
                <button
                    className={`px-2 py-1 ${selected === 'ㅌ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㅌ')}
                >
                    ㅌ
                </button>
                <button
                    className={`px-2 py-1 ${selected === 'ㅍ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㅍ')}
                >
                    ㅍ
                </button>
                <button
                    className={`px-2 py-1 ${selected === 'ㅎ' ? 'bg-PRIMARY_LIGHT text-PRIMARY' : 'bg-BORDER_LIGHT  text-LIGHT_BLACK'}`}
                    onClick={() => handleClick('ㅎ')}
                >
                    ㅎ
                </button>
            </div>
        </>
    );
};

export default SearchConsonant;
