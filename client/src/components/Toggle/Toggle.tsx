interface ToggleProps {
    isContent: boolean;
    leftContent: string;
    rightContent: string;
    handleToggle: () => void;
}

const Toggle = ({ isContent, leftContent, rightContent, handleToggle }: ToggleProps) => {
    return (
        <div className="text-center my-4">
            <span className="text-stone-300 font-bold">{leftContent}</span>
            <span className="mb-4">
                <div
                    className="absolute w-12 h-6 flex items-center bg-gray-300 rounded-full cursor-pointer"
                    onClick={handleToggle}
                >
                    <div
                        className={`absolute left-0 w-full h-full rounded-full transition-transform duration-300 ${isContent ? 'bg-blue-500' : 'bg-gray-300'} `}
                    ></div>
                    <div
                        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform left-0 transition-transform duration-300 ${isContent ? 'translate-x-full' : ''}`}
                    ></div>
                </div>
            </span>
            <span className="text-blue-500 font-bold">{rightContent}</span>
        </div>
    );
};

export default Toggle;
