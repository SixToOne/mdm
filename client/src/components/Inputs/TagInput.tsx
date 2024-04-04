interface TagInputProps {
    placeholder?: string;
    setTagList: Dispatch<SetStateAction<string[]>>;
}

import { Dispatch, SetStateAction, useState } from 'react';

const TagInput = ({ placeholder, setTagList }: TagInputProps) => {
    const [tagInput, setTagInput] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };

    const handleClick = () => {
        if (tagInput.trim() !== '') {
            setTagList((prevList) => [...prevList, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            setTagList((prevList) => [...prevList, tagInput.trim()]);
            setTagInput('');
        }
    };

    return (
        <div className="py-2">
            <span className="text-LIGHT_BLACK font-bold relative z-10 px-2"># </span>
            <input
                type="text"
                placeholder={placeholder}
                onChange={handleChange}
                value={tagInput}
                onKeyDown={handleKeyDown}
                className="border-b-2 w-36 relative"
            />
            <span
                onClick={handleClick}
                className="cursor-pointer text-xs font-bold relative px-2 text-LIGHT_BLACK"
            >
                {' '}
                추가
            </span>
        </div>
    );
};

export default TagInput;
