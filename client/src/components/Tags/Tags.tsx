// interface TagProps {
//     value: string;
// }

// const Tags = ({ value }: TagProps) => {
const Tags = () => {
    return (
        <span>
            {/* 태그가 정해진 폭을 넘어가면 더보기에 자동으로 들어가도록 구현해보자 */}
            {/* 만약 게시글 작성하는 페이지면 boolean 변수를 보내서 true면 스타일 className="bg-blue-500 text-stone-50" 로 변경 */}
            <button className="mr-4 rounded-2xl border-2 border-stone-200 px-4 py-1">
                {/* {value} */}
            </button>
        </span>
    );
};

export default Tags;
