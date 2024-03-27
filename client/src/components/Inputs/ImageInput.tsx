interface ImageInputProps {
    placeholder: string;
    previewList: string[];
    setPreviewList: React.Dispatch<React.SetStateAction<string[]>>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

import { useRef } from 'react';
import styled from 'styled-components';
import { ImageAdd, Delete } from '@/components/icons';

const ImageInput = ({ placeholder, previewList, setPreviewList, onChange }: ImageInputProps) => {
    const inputFile = useRef<HTMLInputElement>(null);
    // const [previewList, setPreviewList] = useState<string[]>([]);

    const handleClick = () => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    };

    const handleDeleteClick = (id: number) => {
        const newList = previewList.filter((_, index) => index !== id);
        setPreviewList(newList);

        // const removeFile = [...previewList];
        // removeFile.splice(id, 1);
        // setPreviewList(removeFile);
    };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = e.target.files;
    //     if (files) {
    //         const list = Array.from(files);
    //         const urls = list.map((file) => URL.createObjectURL(file));
    //         console.log(urls);
    //         setPreviewList((prevList) => [...prevList, ...urls]);
    //     }
    // };

    return (
        <div className="my-2 flex justify-center">
            <div className="flex flex-wrap items-start">
                {previewList.map((src, i) => (
                    <div
                        key={i}
                        className="relative flex justify-center items-center m-2 border-2 rounded-md border-BORDER_LIGHT"
                    >
                        <ImageFrame>
                            <img
                                alt="첨부된 이미지"
                                src={src}
                                className="max-h-full max-w-full object-contain"
                            />
                            <button onClick={() => handleDeleteClick(i)}>
                                <DeleteButton>
                                    <Delete />
                                </DeleteButton>
                            </button>
                        </ImageFrame>
                    </div>
                ))}
                <div className="m-2">
                    <ImageFrame>
                        <button onClick={handleClick}>
                            <div className="flex justify-center">
                                <ImageAdd />
                            </div>
                            <p className="text-xs text-LIGHT_BLACK">사진 추가</p>
                        </button>
                    </ImageFrame>
                </div>

                <input
                    ref={inputFile}
                    type="file"
                    accept="image/*"
                    multiple
                    placeholder={placeholder}
                    className="hidden"
                    onChange={(e) => onChange(e)}
                />
            </div>
        </div>
    );
};

export default ImageInput;

const ImageFrame = styled.div`
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DeleteButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`;
