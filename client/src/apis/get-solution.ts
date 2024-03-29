import axios from 'axios';
import { IQuizSolution } from './types/quiz';

const path = '/quizs';

export const getSolution = async (quizId: number) => {
    const res = await axios.get<IQuizSolution>(`${path}/${quizId}/solution`);
    return res.data;
};
