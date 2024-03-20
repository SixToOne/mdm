import Tags from '../Tags';

const QuizRelatedArticle = () => {
    return (
        <div className="my-4 w-80 px-12 text-left">
            <p className="font-bold mb-4">
                <span className="text-blue-500">몇대몇</span> 실생활 금융
            </p>
            <div className="w-80">
                <p>00명 투표</p>
                <p className="whitespace-pre-line py-2 font-bold">
                    글 제목 들어갈 자리인데 영 글감이 안 나오네
                </p>
            </div>
            {/* <div className="whitespace-nowrap justify-between w-full my-4"> */}
            <div className="justify-between w-full my-4">
                {/* 태그는 최대 3개까지, 더보기 버튼도 필요 */}
                <Tags />
            </div>
        </div>
    );
};

export default QuizRelatedArticle;
