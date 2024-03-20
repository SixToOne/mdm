// 태그 입력일 경우 input 안에 #이 맨 앞에 와야, 밖으로 입력값 빼내서 Tags로 넘겨줄 것, 입력란은 밑줄만 되어있음
interface TagInputProps {
    placeholder: string;
}

const TagInput = ({ placeholder }: TagInputProps) => {
    return (
        <div className="border-b-2">
            <span className="font-bold"># </span>
            <input type="text" placeholder={placeholder} />
        </div>
    );
};

export default TagInput;
