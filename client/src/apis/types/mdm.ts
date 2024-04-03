export type MdmType = 'humor' | 'finance';

export interface IMdm {
    mdmId: number;
    title: string;
    content: string;
    opinion1: IMdmOption;
    opinion2: IMdmOption;
    vote: number;
    views: number;
    type: string;
    nickname: string;
    tags: string[];
    images: string[];
    commentCount: number;
    createdAt: string;
}

export interface IMdmOption {
    opinion: string;
    image: string | null;
    count: number;
    myRatio: number | null;
}

export interface IMdmRatio {
    count1: number;
    count2: number;
}

export interface IMdmComment {
    commentId: number;
    content: string;
    nickname: string;
    like: number;
    liked: boolean;
    createdAt: string;
}

export interface INewComment {
    content: string;
    nickname: string;
    password: string;
}

export interface IRelatedQuiz {
    id: number;
    question: string;
    correct: number;
    submit: number;
    tags: string[];
}
