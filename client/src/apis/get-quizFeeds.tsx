import axios from 'axios';
import { IQuiz } from './types/quiz';

const path = '/feed/quizfeed';

export const getQuizFeeds = async (page: number, size: number) => {
    try {
        const res = await axios.get<IQuiz[]>(`${path}?page=${page}&size=${size}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
