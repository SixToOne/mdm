import axios from 'axios';
import { IMyRatio } from '@/apis/types/mdm-post ';

const path = '/mdms';

export const postMdmVote = async (mdmId: number, data: IMyRatio) => {
    const res = await axios.post(`${path}/${mdmId}/vote`, data);
    return res.data;
};
