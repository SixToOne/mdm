interface TextareaProps {
    placeholder: string;
}

const Textarea = ({ placeholder }: TextareaProps) => {
    return (
        <div>
            <textarea placeholder={placeholder} className="rounded-md border-2 border-stone-300" />
        </div>
    );
};

export default Textarea;
