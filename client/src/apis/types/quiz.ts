export interface IQuiz {
    id: number;
    question: string;
    example1: string;
    example2: string;
    example3: string;
    example4: string;
    answer: number;
    rate: number;
    tags: string[];
}
