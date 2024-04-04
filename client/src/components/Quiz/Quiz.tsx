export interface RegistForm {
    correct: boolean;
}

export interface QuizProps {
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
import { useNavigate } from 'react-router-dom';

const Quiz = ({ solved, setSolved, quizId }: QuizProps) => {
    const [quizData, setQuizData] = useState<IQuiz | null>(null);
    const [tagList, setTagList] = useState<string[]>([]);
    const [select, setSelect] = useState<number | null>(null);
    const [selectedExample, setSelectedExample] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [submit, setSubmit] = useState<boolean>(false);

    const navigate = useNavigate();

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
                        navigate('/404');
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
            setSubmit(true);
            setSolved((prev) => [...prev, quizId]);
            setIsCorrect(isCorrect);
            await postAnswer(quizId, { correct: isCorrect });
        } catch {
            console.error();
        }
    };

    return (
        <div className="mb-4 rounded-md border-2 border-BORDER_LIGHT">
            <div className="flex justify-between w-full px-4 mt-4 mb-4">
                <div className="flex items-start flex-wrap ml-4 ">
                    <Tags tags={tagList} setTagList={setTagList} />
                </div>
            </div>
            <div className="text-end mr-8 mb-2 mt-auto">
                <div className="text-sm whitespace-nowrap text-DARK_BLACK">
                    정답률 {Math.round(quizData?.rate || 0)}%
                </div>
            </div>

            <div className="flex mx-4 text-start">
                <div className="w-full mx-4 mb-4">
                    <p className="font-bold text-lg">{quizData?.question}</p>
                </div>
            </div>

            <div className="flex flex-col items-center pb-4">
                <button
                    className={`w-5/6 rounded-md border-2 border-solid border-BORDER_LIGHT px-4 py-1 flex justify-between ${select === 1 ? 'bg-BACKGROUND_LIGHT_GRAY' : ''} ${submit && isCorrect && selectedExample === quizData?.example1 ? 'text-PRIMARY' : ''} ${submit && !isCorrect && quizData?.answer === quizData?.example1 ? 'text-RED' : ''}`}
                    onClick={() => handleSelect(1, quizData?.example1 || '')}
                >
                    <span>① {quizData?.example1}</span>
                </button>
                <button
                    className={`w-5/6 rounded-md border-2 border-solid border-BORDER_LIGHT px-4 py-1 flex justify-between ${select === 2 ? 'bg-BACKGROUND_LIGHT_GRAY' : ''} ${submit && isCorrect && selectedExample === quizData?.example2 ? 'text-PRIMARY' : ''} ${submit && !isCorrect && quizData?.answer === quizData?.example2 ? 'text-RED' : ''} `}
                    onClick={() => handleSelect(2, quizData?.example2 || '')}
                >
                    <span>② {quizData?.example2}</span>
                </button>
                <button
                    className={`w-5/6 rounded-md border-2 border-solid border-BORDER_LIGHT px-4 py-1  flex justify-between ${select === 3 ? 'bg-BACKGROUND_LIGHT_GRAY' : ''} ${submit && isCorrect && selectedExample === quizData?.example3 ? 'text-PRIMARY' : ''} ${submit && !isCorrect && quizData?.answer === quizData?.example3 ? 'text-RED' : ''}`}
                    onClick={() => handleSelect(3, quizData?.example3 || '')}
                >
                    <span>③ {quizData?.example3}</span>
                </button>
                <button
                    className={`w-5/6 rounded-md border-2 border-solid border-BORDER_LIGHT px-4 py-1 flex justify-between ${select === 4 ? 'bg-BACKGROUND_LIGHT_GRAY' : ''} ${submit && isCorrect && selectedExample === quizData?.example4 ? 'text-PRIMARY' : ''} ${submit && !isCorrect && quizData?.answer === quizData?.example4 ? 'text-RED' : ''}`}
                    onClick={() => handleSelect(4, quizData?.example4 || '')}
                >
                    <span>④ {quizData?.example4}</span>
                </button>
            </div>

            <div className="flex flex-col items-center mb-4">
                <button
                    className={`w-5/6 py-1 px-24 mb-2 rounded-md bg-PRIMARY text-WHITE font-bold ${submit && solved.includes(quizId || 0) ? 'hidden' : ''}`}
                    onClick={handleSubmit}
                >
                    제출하기
                </button>
            </div>
        </div>
    );
};

export default Quiz;
