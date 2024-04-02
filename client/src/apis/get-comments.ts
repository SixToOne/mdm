import axios from 'axios';
import { IMdmComment } from '@/apis/types/mdm';

const path = '/mdms';

export const getMdmComments = async (mdmId: number, pageNum: number, pageSize: number) => {
    const res = await axios.get<{ comments: IMdmComment[] }>(
        `${path}/${mdmId}/comments?page=${pageNum}&size=${pageSize}`
    );
    return res.data.comments;
};

export const getMdmBestComments = async (mdmId: number) => {
    const res = await axios.get<{ comments: IMdmComment[] }>(`${path}/${mdmId}/comments/top3`);
    return res.data.comments;
};

export const getMdmCommentReplies = async (
    mdmId: number,
    mdmCommentId: number,
    pageNum: number,
    pageSize: number
) => {
    const res = await axios.get<{ comments: IMdmComment[] }>(
        `${path}/${mdmId}/comments/${mdmCommentId}/reply?page=${pageNum}&size=${pageSize}`
    );
    return res.data.comments;
};
