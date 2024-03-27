import axios from 'axios';
import { IRelatedMDM } from './types/related-MDM';

const path = '/quizs';

export const getRelatedMDM = async (quizId: number) => {
    try {
        const res = await axios.get<IRelatedMDM[]>(`${path}/${quizId}/mdms`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
