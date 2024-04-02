import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IRelatedQuiz } from '@/apis/types/mdm';
import Tag from '@/components/Tag';

interface RelatedQuiz {
    relatedQuiz: IRelatedQuiz[];
}

const RelatedQuiz = ({ relatedQuiz }: RelatedQuiz) => {
    const navigate = useNavigate();

    return (
        <RelatedQuizWrapper>
            {relatedQuiz.map((quiz) => (
                <QuizItem key={quiz.id} onClick={() => navigate(`/quiz/${quiz.id}`)}>
                    <VoteCount>{quiz.submit}명 참여</VoteCount>
                    <QuizQuestion>{quiz.question}</QuizQuestion>
                    <TagsWrapper>
                        {quiz.tags.map((tag, index) => (
                            <Tag content={tag} key={index} />
                        ))}
                    </TagsWrapper>
                </QuizItem>
            ))}
        </RelatedQuizWrapper>
    );
};

const RelatedQuizWrapper = styled.div``;

const VoteCount = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const QuizQuestion = styled.div``;

const QuizItem = styled.div`
    padding: 8px 0 3px 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const TagsWrapper = styled.div`
    width: 70%;
    display: flex;
    gap: 7px;
    margin-bottom: 12px;
    overflow: scroll;
`;

export default RelatedQuiz;
