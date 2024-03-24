interface TextInputProps {
    placeholder?: string;
    required: boolean;
}

import { useState } from 'react';

const TextInput = ({ placeholder, required }: TextInputProps) => {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={handleChange}
                className="rounded-md border-2 border-BORDER_LIGHT w-full p-2"
            />
        </div>
    );
};

export default TextInput;
