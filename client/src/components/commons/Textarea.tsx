interface TextareaProps {
    placeholder: string;
    required: boolean;
    value: string;
    onChange: (value: string) => void;
}

// import { useState } from 'react';

const Textarea = ({ placeholder, required, value, onChange }: TextareaProps) => {
    // const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
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
