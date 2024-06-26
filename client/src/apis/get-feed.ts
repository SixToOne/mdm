import axios from 'axios';
import { IMdm } from '@/apis/types/mdm';

const path = '/feed';

export const getMdmFeed = async (page: number, size: number) => {
    const res = await axios.get<{ mdmFeeds: IMdm[] }>(`${path}/mdmfeed?page=${page}&size=${size}`);
    return res.data;
};
