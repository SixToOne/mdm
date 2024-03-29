export interface IQuiz {
    id: number;
    question: string;
    example1: string;
    example2: string;
    example3: string;
    example4: string;
    answer: string;
    rate: number;
    tags: string[];
}

export interface IQuizFeed {
    quizFeeds: IQuiz[];
}

export interface IQuizSolution {
    solution: string;
}

export interface IRelatedMDM {
    id: number;
    title: string;
    vote: number;
    tags: string[];
}
