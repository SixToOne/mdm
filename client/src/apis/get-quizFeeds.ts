import axios from 'axios';
import { IQuizFeed } from './types/quiz-feed';

const path = '/feed/quizfeed';

export const getQuizFeeds = async (page: number, size: number) => {
    try {
        const res = await axios.get<IQuizFeed>(`${path}?page=${page}&size=${size}`);
        return res.data.quizFeeds;
    } catch (error) {
        console.log(error);
    }
};
