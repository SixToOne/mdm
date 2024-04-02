import axios from 'axios';

const path = '/search/tag';

export interface ITag {
    tag: string;
    cnt: number;
}

export const getSearchTags = async (keyword: string) => {
    const res = await axios.get<{ tags: ITag[] }>(`${path}?keyword=${keyword}`);
    return res.data;
};
