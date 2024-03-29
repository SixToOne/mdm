import axios from 'axios';
import { IMdmRatio } from '@/apis/types/mdm-post ';

const path = '/mdms';

export const postMdmVote = async (mdmId: number, data: IMdmRatio) => {
    const res = await axios.post(`${path}/${mdmId}/vote`, data);
    return res.data;
};
