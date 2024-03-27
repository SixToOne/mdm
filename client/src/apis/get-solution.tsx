import axios from 'axios';
import { IQuizSolution } from './types/quiz-solution';

const path = '/quizs';

export const getSolution = async (quizId: number) => {
    try {
        const res = await axios.get<IQuizSolution>(`${path}/${quizId}/solution`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
