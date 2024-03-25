interface TextareaProps {
    placeholder: string;
    required: boolean;
}

import { useState } from 'react';

const Textarea = ({ placeholder, required }: TextareaProps) => {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    return (
        <div>
            <textarea
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={handleChange}
                className="rounded-md border-2 border-BORDER_LIGHT w-full h-[120px] p-2"
            />
        </div>
    );
};

export default Textarea;
