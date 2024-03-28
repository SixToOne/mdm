export interface RegistForm {
    correct: boolean;
}

interface QuizProps {
    solved: number[];
    setSolved: Dispatch<SetStateAction<number[]>>;
    quizId: number | undefined;
    handleRoute?: (quizId: number) => void;
}

import { Tags } from '@/components/commons';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getQuiz } from '@/apis/get-quiz';
import { IQuiz } from '@/apis/types/quiz';
import { postAnswer } from '@/apis/post-answer';

const Quiz = ({ solved, setSolved, quizId }: QuizProps) => {
    const [quizData, setQuizData] = useState<IQuiz | null>(null);
    const [tagList, setTagList] = useState<string[]>([]);
    const [select, setSelect] = useState<number | null>(null);
    const [selectedExample, setSelectedExample] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [submit, setSubmit] = useState<boolean>(false);

    // quizId가 변할 때만 함수 실행 = useEffect
    useEffect(() => {
        const getQuizData = async () => {
            try {
                if (quizId) {
                    const quiz = await getQuiz(quizId);
                    if (quiz) {
                        setQuizData(quiz);
                        setTagList(quiz.tags);
                    } else {
                        setQuizData(null);
                    }
                    setIsCorrect(null);
                    setSubmit(false);
                }
            } catch (error) {
                console.error();
            }
        };
        getQuizData();
    }, [quizId]);

    const handleSelect = (which: number, example: string) => {
        setSelect(which);
        setSelectedExample(example);
    };

    const handleSubmit = async () => {
        if (!quizId || selectedExample === '') {
            return;
        }
        try {
            const isCorrect = selectedExample === quizData?.answer;
            console.log(selectedExample, quizData?.answer);
            setSubmit(true);
            setSolved((prev) => [...prev, quizId]);
            setIsCorrect(isCorrect);
            await postAnswer(quizId, { correct: isCorrect });
        } catch {
            console.error();
        }
    };

    const handleReset = () => {
        if (!quizId) {
            return;
        }
        try {
            setIsCorrect(null);
            setSubmit(false);
            setSolved((prev) => prev.filter((id) => id !== quizId));
        } catch {
            console.error();
        }
    };

    return (
        <div className="my-4 rounded-md border-2 border-BORDER_LIGHT">
            <div className="flex flex-col items-center">
                <div className="flex justify-between w-full px-4 my-4 flex-wrap">
                    <span className="flex flex-wrap">
                        <Tags tags={tagList} setTagList={setTagList} />
                    </span>
                </div>
            </div>
            <div className="text-end">
                <div className="mr-4 mb-4">정답률 {Math.round(quizData?.rate || 0)}%</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-full px-4 mb-4 text-start">
                    <p className="font-bold">{quizData?.question}</p>
                </div>
            </div>

            {/* 보기별 정답률은 API에 없는 상태 */}

            <div className="flex flex-col items-center pb-4">
                <button
                    className={`w-80 rounded-md border-2 border-BORDER_LIGHT px-4 py-1 flex justify-between ${select === 1 ? 'bg-BACKGROUND_LIGHT_GRAY' : ''} ${submit && isCorrect && selectedExample === quizData?.example1 ? 'text-PRIMARY' : ''} ${submit && !isCorrect && quizData?.answer === quizData?.example1 ? 'text-RED' : ''}`}
                    onClick={() => handleSelect(1, quizData?.example1 || '')}
                >
                    <span>① {quizData?.example1}</span>
                    {submit && <span>25%</span>}
                </button>
                <button
                    className={`w-80 rounded-md border-2 border-BORDER_LIGHT px-4 py-1 flex justify-between ${select === 2 ? 'bg-BACKGROUND_LIGHT_GRAY' : ''} ${submit && isCorrect && selectedExample === quizData?.example2 ? 'text-PRIMARY' : ''} ${submit && !isCorrect && quizData?.answer === quizData?.example2 ? 'text-RED' : ''} `}
                    onClick={() => handleSelect(2, quizData?.example2 || '')}
                >
                    <span>② {quizData?.example2}</span>
                    {submit && <span>25%</span>}
                </button>
                <button
                    className={`w-80 rounded-md border-2 border-BORDER_LIGHT px-4 py-1 flex justify-between ${select === 3 ? 'bg-BACKGROUND_LIGHT_GRAY' : ''} ${submit && isCorrect && selectedExample === quizData?.example3 ? 'text-PRIMARY' : ''} ${submit && !isCorrect && quizData?.answer === quizData?.example3 ? 'text-RED' : ''}`}
                    onClick={() => handleSelect(3, quizData?.example3 || '')}
                >
                    <span>③ {quizData?.example3}</span>
                    {submit && <span>25%</span>}
                </button>
                <button
                    className={`w-80 rounded-md border-2 border-BORDER_LIGHT px-4 py-1 flex justify-between ${select === 4 ? 'bg-BACKGROUND_LIGHT_GRAY' : ''} ${submit && isCorrect && selectedExample === quizData?.example4 ? 'text-PRIMARY' : ''} ${submit && !isCorrect && quizData?.answer === quizData?.example4 ? 'text-RED' : ''}`}
                    onClick={() => handleSelect(4, quizData?.example4 || '')}
                >
                    <span>④ {quizData?.example4}</span>
                    {submit && <span>25%</span>}
                </button>
            </div>
            <div className="flex flex-col items-center">
                <button
                    className={`py-1 px-32 mb-4 rounded-md bg-PRIMARY text-WHITE font-bold ${submit && solved.includes(quizId || 0) ? 'hidden' : ''}`}
                    onClick={handleSubmit}
                >
                    제출하기
                </button>
                {solved.includes(quizId || 0) && (
                    <button
                        className="py-1 px-32 mb-4 rounded-md bg-PRIMARY text-WHITE font-bold"
                        onClick={handleReset}
                    >
                        다시 풀기
                    </button>
                )}
            </div>
        </div>
    );
};

export default Quiz;
