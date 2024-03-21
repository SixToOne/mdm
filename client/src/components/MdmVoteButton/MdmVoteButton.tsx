import styled from 'styled-components';

interface MdmVoteButtonProps {
    content: string;
    isSelected: boolean;
}

const MdmVoteButton = ({ content, isSelected }: MdmVoteButtonProps) => {
    return (
        <StyledMdmVoteButton isSelected={isSelected}>
            <Content>{content}</Content>
        </StyledMdmVoteButton>
    );
};

const StyledMdmVoteButton = styled.div<{ isSelected: boolean }>`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: ${({ theme, isSelected }) => (isSelected ? theme.PRIMARY : 'white')};
    color: ${({ theme, isSelected }) => (isSelected ? 'white' : theme.DARK_BLACK)};
    border: ${({ theme }) => `1px solid ${theme.BORDER_LIGHT}`};
    font-weight: 500;
    font-size: 14px;
`;

const Content = styled.span`
    text-align: center;
`;

export default MdmVoteButton;
