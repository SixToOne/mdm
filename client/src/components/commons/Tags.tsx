interface TagProps {
    tags: string[];
    isBlue?: boolean;
    setTagList: Dispatch<SetStateAction<string[]>>;
}

import { Dispatch, SetStateAction } from 'react';
import { DeleteTag } from '@/components/icons';

const Tags = ({ tags, isBlue, setTagList }: TagProps) => {
    const removeTag = (index: number) => {
        const removeTags = [...tags];
        removeTags.splice(index, 1);
        setTagList(removeTags);
    };

    return (
        <span className="flex flex-wrap">
            {tags?.map((tag, index) => (
                <button
                    key={index}
                    className={`flex items-center relative mr-4 rounded-2xl ${isBlue ? 'bg-PRIMARY text-WHITE' : 'border-2 border-BORDER_LIGHT'} px-4 py-1`}
                >
                    <div>{tag}</div>
                    {isBlue && (
                        <div className="ml-4 cursor:pointer" onClick={() => removeTag(index)}>
                            <DeleteTag />
                        </div>
                    )}
                </button>
            ))}
        </span>
    );
};

export default Tags;
