/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowDown, Reply } from '@/components/icons';
import { IMdmComment, INewComment } from '@/apis/types/mdm-post ';
import { getFormattedYearMonthDayTime } from '@/utils/time';
import { getMdmCommentReplies } from '@/apis/get-comments';
import { Input, InputUser, Textarea, UploadCommentButton } from '@/pages/MDM';
import { postReply } from '@/apis/post-comment';

interface CommentProps {
    mdmId: number;
    mdmCommentdata: IMdmComment;
}

export const Comment = ({ mdmId, mdmCommentdata }: CommentProps) => {
    const [showReply, setShowReply] = useState<boolean>(false);
    const [repliesData, setRepliesData] = useState<IMdmComment[]>([]);
    const [nickname, setNickname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [commentInputValue, setCommentInputValue] = useState<string>('');

    const fetchData = async () => {
        const data = await getMdmCommentReplies(mdmId, mdmCommentdata.commentId, 0, 20);
        if (data) setRepliesData(data);
    };

    useEffect(() => {
        fetchData();
    }, [mdmId, mdmCommentdata]);

    const uploadComment = async () => {
        if (!mdmCommentdata) return;
        const newComment: INewComment = {
            content: commentInputValue,
            nickname,
            password,
        };
        await postReply(mdmId, mdmCommentdata.commentId, newComment);
        fetchData();
    };

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
            </CommentHeader>
            <CommentContent>{mdmCommentdata.content}</CommentContent>
            <OpenCommentReplyButton handleClick={() => setShowReply(!showReply)} />
            {showReply && (
                <>
                    <InputUser>
                        <Input
                            type="text"
                            placeholder="닉네임"
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="비밀번호"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputUser>
                    <Textarea
                        placeholder="댓글을 작성해주세요."
                        onChange={(e) => setCommentInputValue(e.target.value)}
                    />
                    <UploadCommentButton onClick={uploadComment}>등록</UploadCommentButton>

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

const CreatedDate = styled.span`
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const CommentContent = styled.div`
    padding: 14px 0;
`;

const NoReply = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    font-size: 14px;
`;
