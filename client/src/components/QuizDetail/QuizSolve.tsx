interface QuizProps {
    quizId: number | undefined;
}

const QuizSolve = ({ quizId }: QuizProps) => {
    {
        quizId;
    }
    return (
        <div className="bg-blue-50 my-4 py-8 px-12 text-left">
            <p className="font-bold mb-4">
                <span className="text-blue-500">ChatGPT</span>가 알려주는 금융
            </p>
            <div className="w-80">
                <p className="whitespace-pre-line py-4">
                    이 용어는 쏼라쏼라한 뜻을 가진다. 해설은 이러쿵저러쿵해서 어쩌고저쩌고한다.
                </p>
            </div>
        </div>
    );
};

export default QuizSolve;

// 필요API: 퀴즈해설get
