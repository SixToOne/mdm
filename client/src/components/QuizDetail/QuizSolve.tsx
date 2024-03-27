interface QuizProps {
    quizId: number | undefined;
}

const QuizSolve = ({ quizId }: QuizProps) => {
    {
        quizId;
    }
    return (
        <div className="bg-blue-50 my-8 pt-8 pb-4 px-4 text-left">
            <p className="font-bold mb-4">
                <span className="text-blue-500">ChatGPT</span>가 알려주는 금융
            </p>
            <div className="w-full">
                <p className="whitespace-pre-line py-4">
                    이 용어는 쏼라쏼라한 뜻을 가진다. 해설은 이러쿵저러쿵해서 어쩌고저쩌고한다.
                    그래서 이 문제의 정답은 n번이 된다.
                </p>
            </div>
        </div>
    );
};

export default QuizSolve;

// 필요API: 퀴즈해설get
