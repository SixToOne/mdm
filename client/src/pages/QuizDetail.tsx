import { Quiz } from '@/components/Quiz';
import { QuizRelatedArticle } from '@/components/Quiz';
import { QuizSolve } from '@/components/Quiz';

const QuizDetail = () => {
    return (
        <section className="text-center">
            {/* 헤더 (뒤로가기 버튼)_컴포넌트 가져오기 */}

            {/* 퀴즈 상세 (홈에서도 사용) */}
            <Quiz />

            {/* 퀴즈 용어 정의 & GPT 해설 (제출하기 누른 후에 나타나도록)*/}
            <QuizSolve />

            {/* 연관 실생활 금융 (투표 총 수 + 글 제목 + 글 태그 목록) 최대 3개_컴포넌트 or prop 가져오기 */}
            <QuizRelatedArticle />
        </section>
    );
};

export default QuizDetail;
