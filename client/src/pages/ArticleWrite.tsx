import { useState } from 'react';
import { CompareInput, ImageInput, PasswordInput, TagInput, TextInput } from '@/components/Inputs';
import Tags from '@/components/Tags';
import Textarea from '@/components/Textarea';
import Toggle from '@/components/Toggle';

const ArticleWrite = () => {
    const [isFinance, setIsFinance] = useState(false);
    // const [tagName, setTagName] = useState("");

    const handleFinanceToggle = () => {
        setIsFinance(!isFinance);
    };
    // const handleTags = () => {
    // setTagName();
    // }

    return (
        <section className="w-4/5 mx-auto">
            {/* 유머/금융 토글 */}
            <Toggle
                isContent={isFinance}
                leftContent="유머"
                rightContent="금융"
                handleToggle={handleFinanceToggle}
            />

            <span className="font-bold">제목 </span>
            <span className={'font-bold text-sm ' + (isFinance ? 'text-red-700' : 'text-blue-500')}>
                {isFinance ? '(필수)' : '(선택)'}
            </span>
            <TextInput placeholder="제목을 작성해주세요" />

            <span className="font-bold">내용 </span>
            <span className={'font-bold text-sm ' + (isFinance ? 'text-red-700' : 'text-blue-500')}>
                {isFinance ? '(필수)' : '(선택)'}
            </span>
            <Textarea placeholder="내용을 작성해주세요" />

            <ImageInput placeholder="사진 추가" />

            <p className="font-bold">태그</p>
            <TagInput placeholder="" />
            {/* 위 태그값 반영 */}
            {/* <Tags value={} /> */}
            <Tags />

            <p className="font-bold">몇대몇</p>
            <p className="text-stone-400 text-xs">몇대몇 두 가지 선택지를 입력해주세요</p>
            <CompareInput />

            {/* 화면 폭에 꽉 차게 선 하나 그어줄 것 */}

            <div className="flex justify-center mt-8 mb-2">
                <span className="font-bold text-stone-400 mr-8">닉네임</span>
                <span>
                    <TextInput placeholder="" />
                </span>
            </div>

            <div className="flex justify-center mt-2 mb-8">
                <span className="font-bold text-stone-400 mr-8">비밀번호</span>
                <span>
                    <PasswordInput />
                </span>
            </div>
        </section>
    );
};

export default ArticleWrite;
