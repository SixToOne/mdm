import styled from 'styled-components';

interface TagProps {
    content: string;
    handleClick?: () => void;
}

const Tag = ({ content, handleClick }: TagProps) => {
    return <StyledTag onClick={handleClick}># {content}</StyledTag>;
};

const StyledTag = styled.div`
    padding: 6px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    white-space: nowrap;
    font-size: 12px;
`;

export default Tag;
