export interface RegistForm {
    correct: boolean;
}

interface QuizProps {
    setSolved: Dispatch<SetStateAction<boolean>>;
    solved: boolean;
    quizId: number | undefined;
}

import { Tags } from '@/components/commons';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getQuiz } from '@/apis/get-quiz';
import { IQuiz } from '@/apis/types/quiz';
// import { postAnswer } from '@/apis/post-answer';

// const Quiz = ({ solved, setSolved, quizId }: QuizProps) => {
const Quiz = ({ solved, quizId }: QuizProps) => {
    const [quizData, setQuizData] = useState<IQuiz | null>(null);
    const [tagList, setTagList] = useState<string[]>([]);
    const [select, setSelect] = useState<number | null>(null);
    // const [correct, setCorrect] = useState<boolean | null>(null);

    // quizId가 변할 때만 함수 실행 = useEffect
    useEffect(() => {
        const getQuizData = async () => {
            try {
                if (quizId) {
                    const quiz = await getQuiz(quizId);
                    if (quiz) {
                        console.log(quiz); // 출력 확인
                        setQuizData(quiz);
                        setTagList(quiz.tags);
                    } else {
                        setQuizData(null);
                    }
                }
            } catch (error) {
                console.error();
            }
        };
        getQuizData();
    }, [quizId]);

    const handleSelect = (which: number) => {
        setSelect(which);
    };

    const handleSubmit = async () => {
        if (!quizId || select === null) {
            return;
        }
        // try {
        // const isCorrect = select === quizData?data.answer
        // setCorrect(isCorrect)
        // await postAnswer(quizId, {correct: isCorrect})

        // if (select === quizData?.data.answer) {
        //     setCorrect(true);
        //     const resData = await postAnswer(quizId, { correct });
        // } else {
        //     setCorrect(false);
    };
    // 제출하기 버튼 누르기 전에는 기존 색깔 유지 (+ 선택한 보기만 회색 배경으로 하이라이트 효과 + 이 배경색도 살짝 둥근 꼭지점으로 스타일)
    // if (which === quizData.answer) {
    //     //     // 정답 스타일 적용 (font색을 초록색)
    //     setCorrect(true); // 이렇게 작성하는 게 맞나? 제출하기 전에는 오답 스타일이 적용되어서는 안 되는데.. 어떻게 작성해야 하나?
    //     const resData = await postAnswer({ quizId }, { correct }); // 두 번째 중괄호에 선택한 보기의 정답오답 여부를 보낸다
    // } else {
    //     //     // 오답 스타일 적용 (font색을 빨간색)
    //     setCorrect(false);
    //     const resData = await postAnswer({ quizId }, { correct }); // 얘는 false일텐데도 보내주는 거겠지?
    // }

    // setSolved(!solved);
    // } catch (error) {
    //     console.log(error);
    // }
    // };

    return (
        <div className="my-4 rounded-md border-2 border-BORDER_LIGHT">
            <div className="flex flex-col items-center">
                <div className="justify-between w-auto my-4">
                    <Tags tags={tagList} setTagList={setTagList} />
                    <span className="text-end">정답율 {quizData?.rate}%</span>
                </div>

                <div className="flex w-80 text-left mb-4">
                    <p className="font-bold">{quizData?.question} 퀴즈질문</p>
                </div>
            </div>

            {/* 정답일 경우 녹색 오답일 경우 정답선택지를 빨간색으로 텍스트 효과 */}
            {/* 보기별 정답률은 없는 API에 없는 상태 */}
            <div className="flex flex-col items-center pb-4">
                <button
                    className={`w-80 rounded-md border-2 border-BORDER_LIGHT px-4 py-1 flex justify-between ${select === 1 ? 'bg-BACKGROUND_LIGHT_GRAY' : ''} `}
                    onClick={() => handleSelect(1)}
                >
                    <span>{quizData?.example1} 보기1</span>
                    {solved && <span>00%</span>}
                </button>
                <button
                    className={`w-80 rounded-md border-2 border-BORDER_LIGHT px-4 py-1 flex justify-between ${select === 2 ? 'bg-BACKGROUND_LIGHT_GRAY' : ''}`}
                    onClick={() => handleSelect(2)}
                >
                    <span>{quizData?.example2} 보기2</span>
                    {solved && <span>00%</span>}
                </button>
                <button
                    className={`w-80 rounded-md border-2 border-BORDER_LIGHT px-4 py-1 flex justify-between ${select === 3 ? 'bg-BACKGROUND_LIGHT_GRAY' : ''}`}
                    onClick={() => handleSelect(3)}
                >
                    <span>{quizData?.example3} 보기3</span>
                    {solved && <span>00%</span>}
                </button>
                <button
                    className={`w-80 rounded-md border-2 border-BORDER_LIGHT px-4 py-1 flex justify-between ${select === 4 ? 'bg-BACKGROUND_LIGHT_GRAY' : ''}`}
                    onClick={() => handleSelect(4)}
                >
                    <span>{quizData?.example4} 보기4</span>
                    {solved && <span>00%</span>}
                </button>
            </div>

            <div className="flex flex-col items-center">
                <button
                    className={`py-1 px-32 mb-4 rounded-md bg-PRIMARY text-WHITE font-bold ${solved ? 'hidden' : ''}`}
                    onClick={handleSubmit}
                    // onClick={() => handleSubmit({ select })}
                >
                    제출하기
                </button>
            </div>
        </div>
    );
};

export default Quiz;

// 필요API: 퀴즈상세get(응답에 tags도 포함됨), 퀴즈정답제출
