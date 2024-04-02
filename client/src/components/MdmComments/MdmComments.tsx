import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Comment } from '@/components/Comment';
import CommentForm from '@/components/CommentForm';
import useComment from '@/hooks/useComment';
import { postComment, postLikeComment } from '@/apis/post-comment';
import { getMdmBestComments, getMdmComments } from '@/apis/get-comments';
import { IMdmComment } from '@/apis/types/mdm';

interface MdmCommentsProps {
    mdmId: number;
    totalComment: number;
}

const MdmComments = ({ mdmId, totalComment }: MdmCommentsProps) => {
    const [data, setData] = useState<IMdmComment[]>([]);
    const [bestComments, setBestComments] = useState<IMdmComment[]>([]);
    const { newComment, handleInputCommentForm, validateInput, resetInputValue } = useComment();

    useEffect(() => {
        fetchData();
    }, [mdmId]);

    const fetchData = async () => {
        const data = await getMdmComments(mdmId, 0, 20);
        const best = await getMdmBestComments(mdmId);
        if (data) setData(data);
        if (best) setBestComments(best);
    };

    const uploadComment = useCallback(async () => {
        if (!validateInput()) return;
        await postComment(mdmId, newComment);
        resetInputValue();
        fetchData();
    }, [mdmId, newComment]);

    const updateLikeComment = useCallback(async (mdmId: number, commentId: number) => {
        await postLikeComment(mdmId, commentId);
        fetchData();
    }, []);

    return (
        <StyledMdmComments>
            <CommentHeader>
                <TotalNumberOfComments>댓글 {totalComment}</TotalNumberOfComments>
                <UploadCommentButton onClick={uploadComment}>등록</UploadCommentButton>
            </CommentHeader>
            <CommentForm inputValue={newComment} handleInput={handleInputCommentForm} />
            {bestComments.map((comment) => (
                <Comment
                    key={comment.commentId}
                    mdmId={mdmId}
                    mdmCommentdata={comment}
                    updateLikeComment={updateLikeComment}
                    isBestComment={true}
                />
            ))}
            {data.map((comment) => (
                <Comment
                    key={comment.commentId}
                    mdmId={mdmId}
                    mdmCommentdata={comment}
                    updateLikeComment={updateLikeComment}
                />
            ))}
        </StyledMdmComments>
    );
};

const StyledMdmComments = styled.div``;

const CommentHeader = styled.div`
    width: 100%;
    padding: 18px 3px 10px 3px;
    border-top: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TotalNumberOfComments = styled.div`
    font-size: 18px;
    font-weight: 500;
`;

export const UploadCommentButton = styled.button`
    padding: 3px 7px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    background-color: ${({ theme }) => theme.BACKGROUND_LIGHT_GRAY};
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

export default MdmComments;
