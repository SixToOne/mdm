import axios from 'axios';
import { IDic } from './types/dictionary';

const path = '/search/dictionary';

export const postDictionaryKeyword = async (consonant: string) => {
    try {
        const res = await axios.post<IDic[]>(`${path}?consonant=${consonant}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
