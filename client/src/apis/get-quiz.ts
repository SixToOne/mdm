import axios from 'axios';
import { IQuiz } from './types/quiz';

const path = '/quizs';

export const getQuiz = async (quizId: number) => {
    const res = await axios.get<IQuiz>(`${path}/${quizId}`);
    return res.data;
};
