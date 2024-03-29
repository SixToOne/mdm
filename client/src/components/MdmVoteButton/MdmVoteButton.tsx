import styled from 'styled-components';

interface MdmVoteButtonProps {
    content: string;
    isSelected: boolean;
    handleClick: () => void;
}

const MdmVoteButton = ({ content, isSelected, handleClick }: MdmVoteButtonProps) => {
    return (
        <StyledMdmVoteButton $isSelected={isSelected} onClick={handleClick}>
            <Content>{content}</Content>
        </StyledMdmVoteButton>
    );
};

const StyledMdmVoteButton = styled.div<{ $isSelected: boolean }>`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    text-align: center;
`;

export default MdmVoteButton;
