interface TagProps {
    tags: string[];
    isBlue?: boolean;
    setTagList: Dispatch<SetStateAction<string[]>>;
}

import { Dispatch, SetStateAction } from 'react';

const Tags = ({ tags, isBlue, setTagList }: TagProps) => {
    const removeTag = (index: number) => {
        const removeTags = [...tags];
        removeTags.splice(index, 1);
        setTagList(removeTags);
    };

    return (
        <span>
            {tags?.map((tag, index) => (
                <button
                    key={index}
                    className={`mr-4 rounded-2xl ${isBlue ? 'bg-PRIMARY text-LIGHT_BLACK' : 'border-2 border-BORDER_LIGHT'} px-4 py-1`}
                >
                    <span>{tag}</span>
                    <span onClick={() => removeTag(index)}>x</span>
                </button>
            ))}
        </span>
    );
};

export default Tags;
