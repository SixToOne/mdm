import { useState, useEffect } from 'react';
import { getSolution } from '@/apis/get-solution';
import { IQuizSolution } from '@/apis/types/quiz';

interface QuizProps {
    quizId: number | undefined;
}

const QuizSolve = ({ quizId }: QuizProps) => {
    const [solution, setSolution] = useState<IQuizSolution | undefined>();

    useEffect(() => {
        const getQuizData = async () => {
            try {
                if (quizId) {
                    const res = await getSolution(quizId);
                    if (res) {
                        setSolution(res);
                    }
                }
            } catch (error) {
                console.error();
            }
        };
        getQuizData();
    }, [quizId]);

    return (
        <div className="bg-blue-50 my-8 pt-8 pb-4 px-4 text-left">
            <p className="font-bold mb-4">
                <span className="text-blue-500">ChatGPT</span>가 알려주는 금융
            </p>
            <div className="w-full">
                <p className="whitespace-pre-line py-4">{solution?.solution}</p>
            </div>
        </div>
    );
};

export default QuizSolve;
