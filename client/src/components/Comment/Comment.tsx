import styled from 'styled-components';
import { ArrowDown, Reply } from '@/components/icons';

interface CommentProps {
    isBestComment?: boolean;
}

export const Comment = ({ isBestComment }: CommentProps) => {
    return (
        <StyledComment>
            <CommentHeader>
                {isBestComment && <BestMark>BEST</BestMark>}
                <CommentInfo>
                    <Nickname>육영이</Nickname>
                    <Date>2023.10.23</Date>
                </CommentInfo>
            </CommentHeader>
            <CommentContent>무조건 파혼각</CommentContent>
            <OpenCommentReplyButton />
            <CommentReply />
            <CommentReply />
        </StyledComment>
    );
};

export const CommentReply = () => {
    return (
        <StyledReply>
            <ReplyIconWrapper>
                <Reply />
            </ReplyIconWrapper>
            <div>
                <CommentHeader>
                    <CommentInfo>
                        <Nickname>육영이</Nickname>
                        <Date>2023.10.23</Date>
                    </CommentInfo>
                </CommentHeader>
                <CommentContent>무조건 파혼각</CommentContent>
            </div>
        </StyledReply>
    );
};

const OpenCommentReplyButton = () => {
    return (
        <StyledOpenCommentReplyButton>
            <span>답글</span>
            <ArrowDown />
        </StyledOpenCommentReplyButton>
    );
};

const StyledOpenCommentReplyButton = styled.div`
    margin-left: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.PRIMARY};
    font-size: 14px;
    font-weight: 600;
`;

const StyledReply = styled.div`
    padding: 8px 0;
    display: flex;
`;

const ReplyIconWrapper = styled.div`
    padding: 10px;
`;

const StyledComment = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const BestMark = styled.div`
    margin-right: 5px;
    padding: 0px 6px;
    background-color: ${({ theme }) => theme.PRIMARY};
    color: white;
    font-weight: 500;
    font-size: 14px;
    border-radius: 5px;
`;

const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
`;

const CommentInfo = styled.div`
    display: flex;
    align-items: center;
`;

const Nickname = styled.span`
    margin-right: 5px;
`;

const Date = styled.span`
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const CommentContent = styled.div`
    padding: 5px 0;
`;
