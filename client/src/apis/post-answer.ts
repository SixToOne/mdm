import axios from 'axios';
import { RegistForm } from '@/components/Quiz/Quiz';

const path = '/quizs';

export const postAnswer = async (quizId: number, req: RegistForm) => {
    try {
        const res = await axios.post<RegistForm>(`${path}/${quizId}/submit`, req);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
