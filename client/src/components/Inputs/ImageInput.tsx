// 이미지 첨부일 경우 미리보기 필요, 첨부 버튼을 피그마 첨부 아이콘처럼 디자인해야
interface ImageInputProps {
    placeholder: string;
}

const ImageInput = ({ placeholder }: ImageInputProps) => {
    return (
        <div>
            <input type="file" placeholder={placeholder} className="my-2" />
        </div>
    );
};

export default ImageInput;
