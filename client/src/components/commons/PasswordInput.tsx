interface PasswordInputProps {
    required: boolean;
    value: string;
    onChange: (value: string) => void;
}

// import { useState } from 'react';

const PasswordInput = ({ required, value, onChange }: PasswordInputProps) => {
    // const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <input
                type="password"
                required={required}
                value={value}
                onChange={handleChange}
                className="rounded-md border-2 border-BORDER_LIGHT w-full p-2"
            />
        </div>
    );
};

export default PasswordInput;
