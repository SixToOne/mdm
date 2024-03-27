import { Quiz } from '@/components/Quiz';
import { QuizRelatedArticle, QuizSolve } from '@/components/QuizDetail';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const QuizDetail = () => {
    const [solved, setSolved] = useState(false);

    const { id } = useParams();
    const quizId: number | undefined = id ? parseInt(id) : undefined;

    return (
        <section className="text-center">
            <Quiz solved={solved} setSolved={setSolved} quizId={quizId} />
            {solved && <QuizSolve quizId={quizId} />}
            <QuizRelatedArticle quizId={quizId} />
        </section>
    );
};

export default QuizDetail;
