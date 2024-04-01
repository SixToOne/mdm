import axios from 'axios';
import { INewComment } from '@/apis/types/mdm-post ';

const path = '/mdms';

export const postComment = async (mdmId: number, data: INewComment) => {
    const res = await axios.post(`${path}/${mdmId}/comments`, data);
    return res.data;
};

export const postReply = async (mdmId: number, commentId: number, data: INewComment) => {
    const res = await axios.post(`${path}/${mdmId}/comments/${commentId}/reply`, data);
    return res.data;
};

export const postLikeComment = async (mdmId: number, commentId: number) => {
    const res = await axios.post(`${path}/${mdmId}/comments/${commentId}/likes`);
    return res.data;
};
