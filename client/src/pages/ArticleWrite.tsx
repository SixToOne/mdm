/* eslint-disable @typescript-eslint/no-unused-vars */
export interface WriteForm {
    title: string;
    content: string;
    opinion1: string;
    opinion2: string;
    type: string;
    nickname: string;
    password: string;
    tags: string[];
}

import { useState } from 'react';
import { CompareInput, ImageInput, TagInput } from '@/components/Inputs';
import { PasswordInput, Tags, Textarea, TextInput, Toggle } from '@/components/commons';

// 헤더로 옮기면 임시 import 지우기!
import { postNewMDM } from '@/apis/post-newMDM';
import { useNavigate } from 'react-router-dom';

const ArticleWrite = () => {
    const [isFinance, setIsFinance] = useState(false);
    const [previewList, setPreviewList] = useState<string[]>([]);
    const [tagList, setTagList] = useState<string[]>([]);
    const [writtenData, setWrittenData] = useState<WriteForm>({
        title: '',
        content: '',
        opinion1: '',
        opinion2: '',
        type: 'humor',
        nickname: '',
        password: '',
        tags: [],
    });
    const [firstImage, setFirstImage] = useState<File>();
    const [secondImage, setSecondImage] = useState<File>();
    const [images, setImages] = useState<File[]>([]);
    const navigate = useNavigate();

    const handleFinanceToggle = () => {
        setIsFinance((isFinance) => !isFinance);
        setWrittenData((prevData) => ({
            ...prevData,
            type: !isFinance ? 'finance' : 'humor',
        }));
    };

    const handleChange = (key: string, value: string | string[]) => {
        setWrittenData((prevData) => ({
            ...prevData,
            [key]: value,
            tags: tagList,
        }));
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setWrittenData((prevData) => ({
            ...prevData,
            [key]: e.target.value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileList = Array.from(files);
            setImages((prev) => [...prev, ...fileList]);
            const urls = fileList.map((file) => URL.createObjectURL(file));
            setPreviewList((prevList) => [...prevList, ...urls]);
        }
    };

    const handleCompareChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (type === 'first') {
                setFirstImage(file);
            } else {
                setSecondImage(file);
            }
        }
    };

    // TODO: Header로
    const uploadArticle = async (
        writtenData: WriteForm,
        firstImage: File | undefined,
        secondImage: File | undefined,
        images: File[]
    ) => {
        if (writtenData.type === 'finance') {
            if (
                !writtenData.title ||
                !writtenData.content ||
                !writtenData.opinion1 ||
                !writtenData.opinion2 ||
                !writtenData.nickname ||
                !writtenData.password
            ) {
                alert('필수 입력란을 작성해주세요.');
                return;
            }
        } else {
            if (
                !writtenData.opinion1 ||
                !writtenData.opinion2 ||
                !writtenData.nickname ||
                !writtenData.password
            ) {
                alert('필수 입력란을 작성해주세요.');
                return;
            }
        }
        const formData = new FormData();
        formData.append(
            'mdmRequestDto',
            new Blob([JSON.stringify(writtenData)], { type: 'application/json' })
        );
        if (firstImage) {
            formData.append('image1', firstImage);
        }
        if (secondImage) {
            formData.append('image2', secondImage);
        }
        if (images.length > 0) {
            images.forEach((image, index) => {
                formData.append('images', image);
            });
        }

        const res = await postNewMDM(formData);
        const id = res?.mdmId;
        if (id) {
            navigate(`/mdm/${id}`);
        }
    };

    return (
        <div>
            <button onClick={() => uploadArticle(writtenData, firstImage, secondImage, images)}>
                등록
            </button>
            <section className="mx-auto">
                <Toggle
                    isContent={isFinance}
                    leftContent="유머"
                    rightContent="금융"
                    handleToggle={handleFinanceToggle}
                />

                <div className="my-4">
                    <span className="font-bold my-4">제목 </span>
                    <span
                        className={
                            'my-4 font-bold text-sm ' +
                            (isFinance ? 'text-DARK_RED' : 'text-PRIMARY')
                        }
                    >
                        {isFinance ? '(필수)' : '(선택)'}
                    </span>
                    <div className="my-2">
                        <TextInput
                            placeholder="제목을 작성해주세요"
                            required={isFinance}
                            value={writtenData.title}
                            onChange={(value) => handleChange('title', value)}
                        />
                    </div>
                </div>

                <div className="my-4">
                    <span className="font-bold my-4">내용 </span>
                    <span
                        className={
                            'my-4 font-bold text-sm ' +
                            (isFinance ? 'text-DARK_RED' : 'text-PRIMARY')
                        }
                    >
                        {isFinance ? '(필수)' : '(선택)'}
                    </span>
                    <div className="my-2">
                        <Textarea
                            placeholder="내용을 작성해주세요"
                            required={isFinance}
                            value={writtenData.content}
                            onChange={(value) => handleChange('content', value)}
                        />
                    </div>
                </div>

                <div className="my-4">
                    <ImageInput
                        placeholder="사진 추가"
                        onChange={handleImageChange}
                        previewList={previewList}
                        setPreviewList={setPreviewList}
                    />
                </div>

                <p className="font-bold mt-4 mb-2">태그</p>
                <TagInput setTagList={setTagList} />
                <Tags tags={tagList} isBlue setTagList={setTagList} />

                <p className="font-bold mt-4 mb-2">몇대몇</p>
                <p className="text-LIGHT_BLACK text-xs mt-2">
                    몇대몇 두 가지 선택지를 입력해주세요
                </p>
                <CompareInput
                    compare="몇대몇"
                    opinion1={writtenData.opinion1}
                    opinion2={writtenData.opinion2}
                    handleValueChange={handleValueChange}
                    onChange={handleCompareChange}
                />
            </section>

            <div className="border-t-2 my-8"></div>

            <section>
                <div className="flex justify-between items-center mt-4 mb-2">
                    <div className="font-bold text-LIGHT_BLACK mr-8">닉네임</div>
                    <div className="w-3/5">
                        <TextInput
                            required
                            value={writtenData.nickname}
                            onChange={(value) => handleChange('nickname', value)}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2 mb-4">
                    <div className="font-bold text-LIGHT_BLACK mr-8">비밀번호</div>
                    <div className="w-3/5">
                        <PasswordInput
                            required
                            value={writtenData.password}
                            onChange={(value) => handleChange('password', value)}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticleWrite;
