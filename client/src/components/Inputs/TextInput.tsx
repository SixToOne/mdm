interface TextInputProps {
    placeholder: string;
}

const TextInput = ({ placeholder }: TextInputProps) => {
    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                className="rounded-md border-2 border-stone-300"
            />
        </div>
    );
};

export default TextInput;
