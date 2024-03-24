interface CompareInputProps {
    compare: string;
}

import { useState, useRef } from 'react';
import styled from 'styled-components';
import { FileAdd, Delete } from '@/components/icons';

const CompareInput = ({ compare }: CompareInputProps) => {
    const [firstValue, setFirstValue] = useState<string>('');
    const [secondValue, setSecondValue] = useState<string>('');

    const firstInputFile = useRef<HTMLInputElement>(null);
    const secondInputFile = useRef<HTMLInputElement>(null);

    const [firstFile, setFirstFile] = useState<string>('');
    const [secondFile, setSecondFile] = useState<string>('');

    const handleClick = (inputFile: React.RefObject<HTMLInputElement>) => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    };

    const handleFirstDeleteClick = () => {
        setFirstFile('');
    };

    const handleSecondDeleteClick = () => {
        setSecondFile('');
    };

    const handleFirstValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstValue(e.target.value);
    };
    const handleSecondValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecondValue(e.target.value);
    };

    const handleFirstFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file) {
            const files = Array.from(file);
            const url = URL.createObjectURL(files[0]);
            setFirstFile(url);
        }
    };
    const handleSecondFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file) {
            const files = Array.from(file);
            const url = URL.createObjectURL(files[0]);
            setSecondFile(url);
        }
    };

    return (
        <section>
            <div className="flex justify-between my-2">
                <div className="font-bold mr-2 py-2">1</div>
                <input
                    type="text"
                    onChange={handleFirstValueChange}
                    placeholder="첫 번째 선택지를 입력해주세요"
                    className="w-4/5 border-2 border-BORDER_LIGHT rounded-md p-2"
                />
                <button
                    onClick={() => {
                        handleClick(firstInputFile);
                    }}
                >
                    <div>
                        <FileAdd />
                    </div>
                </button>
                <input
                    ref={firstInputFile}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFirstFileChange}
                />
            </div>
            <div className="flex justify-between my-2">
                <div className="font-bold mr-2 py-2">2</div>
                <input
                    type="text"
                    onChange={handleSecondValueChange}
                    placeholder="두 번째 선택지를 입력해주세요"
                    className="w-4/5 border-2 border-BORDER_LIGHT rounded-md p-2"
                />
                <button
                    onClick={() => {
                        handleClick(secondInputFile);
                    }}
                >
                    <div>
                        <FileAdd />
                    </div>
                </button>
                <input
                    ref={secondInputFile}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleSecondFileChange}
                />
            </div>

            <div>
                <p className="font-bold my-2">{compare} 미리보기</p>
                <table className="flex justify-around my-2">
                    <tbody>
                        <tr>
                            <td className="w-1/2">
                                <div className="relative w-[130px] h-[130px] flex justify-center items-center mx-2 p-2 border-2 rounded-[12px] border-BORDER_LIGHT">
                                    {firstFile && (
                                        <>
                                            <img
                                                alt="첨부된 이미지"
                                                src={firstFile}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                            <button onClick={handleFirstDeleteClick}>
                                                <DeleteButton className="mx-3 my-3">
                                                    <Delete />
                                                </DeleteButton>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                            <td className="w-1/2">
                                <div className="relative w-[130px] h-[130px] flex justify-center items-center mx-2 p-2 border-2 rounded-[12px] border-BORDER_LIGHT">
                                    {secondFile && (
                                        <>
                                            <img
                                                alt="첨부된 이미지"
                                                src={secondFile}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                            <button onClick={handleSecondDeleteClick}>
                                                <DeleteButton className="mx-3 my-3">
                                                    <Delete />
                                                </DeleteButton>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td className="w-1/2">
                                <div className="w-[130px] min-h-[30px] border-2 border-BORDER_LIGHT rounded-md mx-2">
                                    {firstValue}
                                </div>
                            </td>
                            <td className="w-1/2">
                                <div className="w-[130px] min-h-[30px] border-2 border-BORDER_LIGHT rounded-md mx-2">
                                    {secondValue}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default CompareInput;

const DeleteButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`;
