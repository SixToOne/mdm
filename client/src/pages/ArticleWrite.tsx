import { useState } from 'react';
import { CompareInput, ImageInput, PasswordInput, TagInput, TextInput } from '@/components/Inputs';
import Tags from '@/components/Tags';
import Textarea from '@/components/Textarea';
import Toggle from '@/components/Toggle';

const ArticleWrite = () => {
    const [isFinance, setIsFinance] = useState(false);
    const [tagList, setTagList] = useState<string[]>([]);

    const handleFinanceToggle = () => {
        setIsFinance(!isFinance);
    };

    return (
        <>
            <section className="mx-auto">
                <Toggle
                    isContent={isFinance}
                    leftContent="유머"
                    rightContent="금융"
                    handleToggle={handleFinanceToggle}
                />

                <div>
                    <span className="font-bold">제목 </span>
                    <span
                        className={
                            'font-bold text-sm ' + (isFinance ? 'text-DARK_RED' : 'text-PRIMARY')
                        }
                    >
                        {isFinance ? '(필수)' : '(선택)'}
                    </span>
                    <TextInput placeholder="제목을 작성해주세요" required={isFinance} />
                </div>
                <div className="mt-4">
                    <span className="font-bold">내용 </span>
                    <span
                        className={
                            'font-bold text-sm ' + (isFinance ? 'text-DARK_RED' : 'text-PRIMARY')
                        }
                    >
                        {isFinance ? '(필수)' : '(선택)'}
                    </span>
                    <Textarea placeholder="내용을 작성해주세요" required={isFinance} />
                </div>

                <ImageInput placeholder="사진 추가" />

                <p className="font-bold">태그</p>
                <TagInput setTagList={setTagList} />
                <Tags tags={tagList} isBlue setTagList={setTagList} />

                <p className="font-bold">몇대몇</p>
                <p className="text-LIGHT_BLACK text-xs">몇대몇 두 가지 선택지를 입력해주세요</p>
                <CompareInput compare="몇대몇" />
            </section>

            {/* 메인 레이아웃 width가 있어서 화면 100%에 선이 그어지지가 않음 => how? */}
            <div className="border-t-2 mt-8"></div>

            <section>
                <div className="flex justify-between items-center mt-8 mb-2">
                    <div className="font-bold text-LIGHT_BLACK mr-8">닉네임</div>
                    <div className="w-3/5">
                        <TextInput required />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2 mb-8">
                    <div className="font-bold text-LIGHT_BLACK mr-8">비밀번호</div>
                    <div className="w-3/5">
                        <PasswordInput required />
                    </div>
                </div>
            </section>
        </>
    );
};

export default ArticleWrite;
