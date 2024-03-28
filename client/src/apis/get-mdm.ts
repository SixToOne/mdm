/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { IMdm } from './types/mdm-post ';

const path = '/mdms';

export const getMdmPost = async (mdmId: number) => {
    const res = await axios.get<IMdm>(`${path}/${mdmId}`);
    return res.data;
};
