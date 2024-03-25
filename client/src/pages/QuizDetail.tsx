import { Quiz } from '@/components/Quiz';
import { QuizRelatedArticle, QuizSolve } from '@/components/QuizDetail';
import { useState } from 'react';

const QuizDetail = () => {
    const [solved, setSolved] = useState(false);

    return (
        <section className="text-center">
            <Quiz solved={solved} setSolved={setSolved} />
            {solved && <QuizSolve />}
            <QuizRelatedArticle />
        </section>
    );
};

export default QuizDetail;
