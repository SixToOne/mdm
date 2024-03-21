import { Quiz } from '@/components/Quiz';
import { QuizRelatedArticle } from '@/components/Quiz';
import { QuizSolve } from '@/components/Quiz';

const QuizDetail = () => {
    return (
        <section className="text-center">
            <Quiz />
            {/* 해설 컴포넌트: 제출하기 누른 후에 나타나도록 */}
            <QuizSolve />
            <QuizRelatedArticle />
        </section>
    );
};

export default QuizDetail;
