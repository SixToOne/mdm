interface ToggleProps {
    isContent: boolean;
    leftContent: string;
    rightContent: string;
    handleToggle: () => void;
}

const Toggle = ({ isContent, leftContent, rightContent, handleToggle }: ToggleProps) => {
    return (
        <div className="text-center my-4 flex justify-center">
            <div className="relative text-stone-300 font-bold">{leftContent}</div>
            <div className="mb-4 mx-2">
                <div
                    className="relative w-12 h-6 flex items-center bg-gray-300 rounded-full cursor-pointer"
                    onClick={handleToggle}
                >
                    <div
                        className={`absolute left-0 w-full h-full rounded-full transition-transform duration-300 ${isContent ? 'bg-blue-500' : 'bg-gray-300'} `}
                    ></div>
                    <div
                        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform left-0 transition-transform duration-300 ${isContent ? 'translate-x-full' : ''}`}
                    ></div>
                </div>
            </div>
            <div className="relative text-blue-500 font-bold">{rightContent}</div>
        </div>
    );
};

export default Toggle;
