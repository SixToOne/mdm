import axios from 'axios';
import { IDic } from './types/dictionary';

const path = '/search/dictionary';

export const getDictionaryKeyword = async (consonant: string) => {
    try {
        const res = await axios.get<IDic[]>(`${path}?consonant=${consonant}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
