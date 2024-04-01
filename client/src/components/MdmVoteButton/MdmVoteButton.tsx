import styled from 'styled-components';

interface MdmVoteButtonProps {
    content: string;
    imageSource?: string | null;
    isSelected: boolean;
    handleClick: () => void;
}

const MdmVoteButton = ({ content, imageSource, isSelected, handleClick }: MdmVoteButtonProps) => {
    return (
        <>
            <StyledMdmVoteButton
                $isSelected={isSelected}
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}
            >
                {imageSource && <Image src={imageSource} alt="몇대몇 사진" />}
                <Content>{content}</Content>
            </StyledMdmVoteButton>
        </>
    );
};

const StyledMdmVoteButton = styled.div<{ $isSelected: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    border-radius: 5px;
    background-color: ${({ theme, $isSelected }) =>
        $isSelected ? theme.PRIMARY_LIGHT : theme.BACKGROUND_LIGHT_GRAY};
    color: ${({ theme, $isSelected }) => ($isSelected ? theme.PRIMARY : theme.DARK_BLACK)};
    font-weight: 600;
    font-size: 16px;
    word-break: keep-all;
    cursor: pointer;
`;

const Content = styled.span`
    width: 100%;
    height: 100%;
    padding: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    width: 100%;
    height: 80px;
    border-radius: 5px 5px 0 0;
    object-fit: cover;
`;

export default MdmVoteButton;
