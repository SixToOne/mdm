import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowDown, Reply } from '@/components/icons';
import { IMdmComment } from '@/apis/types/mdm-post ';
import { getFormattedYearMonthDayTime } from '@/utils/time';
import { getMdmCommentReplies } from '@/apis/get-comments';
import CommentForm from '@/components/CommentForm';
import useComment from '@/hooks/useComment';
import { UploadCommentButton } from '@/components/MdmComments/MdmComments';
import { postLikeComment, postReply } from '@/apis/post-comment';
import ThumbsUp from '@/components/icons/ThumbsUp';

interface CommentProps {
    mdmId: number;
    mdmCommentdata: IMdmComment;
}

export const Comment = ({ mdmId, mdmCommentdata }: CommentProps) => {
    // 대댓글
    const { newComment, handleInputCommentForm, validateInput, resetInputValue } = useComment();
    const [showReply, setShowReply] = useState<boolean>(false);
    const [repliesData, setRepliesData] = useState<IMdmComment[]>([]);

    useEffect(() => {
        fetchData();
    }, [mdmId, mdmCommentdata]);

    const fetchData = async () => {
        const data = await getMdmCommentReplies(mdmId, mdmCommentdata.commentId, 0, 20);
        if (data) setRepliesData(data);
    };

    const uploadReply = useCallback(async () => {
        if (!validateInput()) return;
        await postReply(mdmId, mdmCommentdata.commentId, newComment);
        resetInputValue();
        fetchData();
    }, [mdmId, newComment]);

    const updateLikeComment = useCallback(async () => {
        await postLikeComment(mdmId, mdmCommentdata.commentId);
        fetchData();
    }, [mdmId]);

    return (
        <StyledComment>
            <CommentHeader>
                {mdmCommentdata.liked && <BestMark>BEST</BestMark>}
                <CommentInfo>
                    <Nickname>{mdmCommentdata.nickname}</Nickname>
                    <CreatedDate>
                        {getFormattedYearMonthDayTime(new Date(mdmCommentdata.createdAt))}
                    </CreatedDate>
                </CommentInfo>
                <Liked>
                    <button onClick={updateLikeComment}>
                        <ThumbsUp checked={mdmCommentdata.liked} />
                    </button>
                    <LikedCount>{mdmCommentdata.like}</LikedCount>
                </Liked>
            </CommentHeader>
            <CommentContent>{mdmCommentdata.content}</CommentContent>
            <OpenCommentReplyButton handleClick={() => setShowReply(!showReply)} />
            {showReply && (
                <>
                    <CommentForm inputValue={newComment} handleInput={handleInputCommentForm} />
                    <UploadCommentButton onClick={uploadReply}>등록</UploadCommentButton>
                    {repliesData.length > 0 ? (
                        repliesData.map((reply) => (
                            <CommentReply key={reply.commentId} replyData={reply} />
                        ))
                    ) : (
                        <NoReply>답글이 없어요.</NoReply>
                    )}
                </>
            )}
        </StyledComment>
    );
};

interface CommentReplyProps {
    replyData: IMdmComment;
}

export const CommentReply = ({ replyData }: CommentReplyProps) => {
    return (
        <StyledReply>
            <ReplyIconWrapper>
                <Reply />
            </ReplyIconWrapper>
            <div>
                <CommentHeader>
                    <CommentInfo>
                        <Nickname>{replyData.nickname}</Nickname>
                        <CreatedDate>
                            {getFormattedYearMonthDayTime(new Date(replyData.createdAt))}
                        </CreatedDate>
                    </CommentInfo>
                </CommentHeader>
                <CommentContent>{replyData.content}</CommentContent>
            </div>
        </StyledReply>
    );
};

interface OpenCommentReplyButtonProps {
    handleClick: () => void;
}

const OpenCommentReplyButton = ({ handleClick }: OpenCommentReplyButtonProps) => {
    return (
        <StyledOpenCommentReplyButton onClick={handleClick}>
            <span>답글</span>
            <ArrowDown />
        </StyledOpenCommentReplyButton>
    );
};

const StyledOpenCommentReplyButton = styled.div`
    margin: 0 0 7px 2px;
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.PRIMARY};
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
    align-items: start;
    font-size: 14px;
`;

const CommentInfo = styled.div`
    display: flex;
    align-items: center;
`;

const Nickname = styled.span`
    margin-right: 5px;
`;

const CreatedDate = styled.span`
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const CommentContent = styled.div`
    padding: 0 0 14px 0;
`;

const NoReply = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    font-size: 14px;
`;

const Liked = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: end;
`;

const LikedCount = styled.span`
    width: 18px;
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    text-align: center;
`;
