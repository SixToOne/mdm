import axios from 'axios';
import { IRelatedMDM } from './types/quiz';

const path = '/quizs';

export const getRelatedMDM = async (quizId: number) => {
    const res = await axios.get<IRelatedMDM[]>(`${path}/${quizId}/mdms`);
    return res.data;
};
