import { getMdmComments } from '@/apis/get-comments';
import { IMdmComment } from '@/apis/types/mdm-post ';
import { Comment } from '@/components/Comment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface MdmCommentsProps {
    mdmId: number;
}

const MdmComments = ({ mdmId }: MdmCommentsProps) => {
    const [data, setData] = useState<IMdmComment[]>([]);

    useEffect(() => {
        const fetchMdmData = async () => {
            const data = await getMdmComments(mdmId, 0, 20);
            if (data) setData(data);
        };
        fetchMdmData();
    }, [mdmId]);

    return (
        <StyledMdmComments>
            {data.map((comment) => (
                <>
                    <Comment mdmId={mdmId} mdmCommentdata={comment} key={comment.commentId} />
                    <Comment mdmId={mdmId} mdmCommentdata={comment} key={comment.commentId} />
                    <Comment mdmId={mdmId} mdmCommentdata={comment} key={comment.commentId} />
                    <Comment mdmId={mdmId} mdmCommentdata={comment} key={comment.commentId} />
                </>
            ))}
        </StyledMdmComments>
    );
};

const StyledMdmComments = styled.div``;

export default MdmComments;
