import axios from 'axios';
import { IQuiz } from './types/quiz';

const path = '/feed/quizfeed';

export const getQuizFeeds = async (page: number, size: number) => {
    const res = await axios.get<{ quizFeeds: IQuiz[] }>(`${path}?page=${page}&size=${size}`);
    return res.data;
};
