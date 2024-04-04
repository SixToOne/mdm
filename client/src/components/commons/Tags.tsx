interface TagProps {
    tags: string[];
    isBlue?: boolean;
    setTagList?: Dispatch<SetStateAction<string[]>>;
}

import { Dispatch, SetStateAction } from 'react';
import { DeleteTag } from '@/components/icons';

const Tags = ({ tags, isBlue, setTagList }: TagProps) => {
    const removeTag = (index: number) => {
        const removeTags = [...tags];
        removeTags.splice(index, 1);
        if (setTagList) {
            setTagList(removeTags);
        }
    };

    return (
        <span className="flex flex-wrap">
            {tags?.map((tag, index) => (
                <button key={index}>
                    <div
                        className={`flex text-xs items-center mr-2 my-1 rounded-xl px-2 py-1 ${isBlue === true ? 'bg-PRIMARY text-WHITE' : 'border-2 border-BORDER_LIGHT'}`}
                    >
                        # {tag}
                        {isBlue && (
                            <div
                                className="relative ml-2 cursor:pointer"
                                onClick={() => removeTag(index)}
                            >
                                <DeleteTag />
                            </div>
                        )}
                    </div>
                </button>
            ))}
        </span>
    );
};

export default Tags;
