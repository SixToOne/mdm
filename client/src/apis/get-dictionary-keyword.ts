import axios from 'axios';
import { IDic } from './types/dictionary';

const path = '/search/dictionary';

export const getDictionaryKeyword = async (word: string) => {
    try {
        const res = await axios.get<IDic[]>(`${path}?word=${word}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
