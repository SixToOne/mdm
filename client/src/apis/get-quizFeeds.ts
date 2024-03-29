import axios from 'axios';
import { IQuizFeed } from './types/quiz';

const path = '/feed/quizfeed';

export const getQuizFeeds = async (page: number, size: number) => {
    const res = await axios.get<IQuizFeed>(`${path}?page=${page}&size=${size}`);
    return res.data.quizFeeds;
};
