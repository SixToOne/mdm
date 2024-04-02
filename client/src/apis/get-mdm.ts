import axios from 'axios';
import { IMdm, IRelatedQuiz } from '@/apis/types/mdm';

const path = '/mdms';

export const getMdmPost = async (mdmId: number) => {
    const res = await axios.get<IMdm>(`${path}/${mdmId}`);
    return res.data;
};

export const getMdmRelatedQuiz = async (mdmId: number) => {
    const res = await axios.get<IRelatedQuiz[]>(`${path}/${mdmId}/quizs`);
    return res.data;
};
