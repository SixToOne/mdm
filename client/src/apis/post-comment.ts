import axios from 'axios';
import { INewComment } from '@/apis/types/mdm-post ';

const path = '/mdms';

export const postComment = async (mdmId: number, data: INewComment) => {
    const res = await axios.post(`${path}/${mdmId}/comments`, data);
    return res.data;
};
