interface QuizProps {
    setSolved: Dispatch<SetStateAction<boolean>>;
    solved: boolean;
}

import { Tags } from '@/components/commons';
import { Dispatch, SetStateAction, useState } from 'react';

const Quiz = ({ solved, setSolved }: QuizProps) => {
    const [tagList, setTagList] = useState<string[]>([]);

    const handleClick = () => {
        setSolved(!solved);
    };

    return (
        <div className="my-4">
            <div className="flex flex-col items-center">
                <div className="justify-between w-auto my-4">
                    <Tags tags={tagList} setTagList={setTagList} />
                    {/* 정답 선택지의 정답률 */}
                    <span className="text-end">정답율 00%</span>
                </div>

                {/* 퀴즈 제목 */}
                <div className="flex w-80 text-left mb-4">
                    <p className="font-bold">
                        사람은 밥을 먹지 않고 최대 며칠까지 잠만 잘 수 있을까? 동면하고싶다
                    </p>
                </div>
            </div>
            {/* 퀴즈 보기 버튼 4개 => 4번 반복해서 내용만 갈아치워서 보여주기, 보기 번호는 따로 뽑아놨다가 인덱스 맞춰서 표기? */}
            {/* 누르면 선택된 하이라이트 효과, 제출하기 버튼 누르고 나면 정답일 경우 녹색 오답일 경우 정답선택지를 빨간색으로 텍스트 효과 */}
            <div className="flex flex-col items-center pb-4">
                <button className="w-80 rounded-md border-2 border-BORDER_LIGHT px-4 py-1 flex justify-between">
                    <span>1. 보기 내용</span>
                    <span>00%</span>
                </button>
                <button className="w-80 rounded-md border-2 border-BORDER_LIGHT px-4 py-1 flex justify-between">
                    <span>1. 보기 내용</span>
                    <span>00%</span>
                </button>
                <button className="w-80 rounded-md border-2 border-BORDER_LIGHT px-4 py-1 flex justify-between">
                    <span>1. 보기 내용</span>
                    <span>00%</span>
                </button>
                <button className="w-80 rounded-md border-2 border-BORDER_LIGHT px-4 py-1 flex justify-between">
                    <span>1. 보기 내용</span>
                    <span>00%</span>
                </button>
            </div>
            {/* 보기별 정답율 4개 => 제출하기 버튼 누르고 나서 나타나도록 */}

            <button
                className={`py-1 px-32 mb-4 rounded-md bg-PRIMARY text-WHITE font-bold ${solved ? 'hidden' : ''}`}
                onClick={handleClick}
            >
                제출하기
            </button>
        </div>
    );
};

export default Quiz;
