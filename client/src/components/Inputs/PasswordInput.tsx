interface PasswordInputProps {
    required: boolean;
}

import { useState } from 'react';

const PasswordInput = ({ required }: PasswordInputProps) => {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div>
            <input
                type="password"
                required={required}
                value={value}
                onChange={handleChange}
                className="rounded-md border-2 border-BORDER_LIGHT p-2"
            />
        </div>
    );
};

export default PasswordInput;
