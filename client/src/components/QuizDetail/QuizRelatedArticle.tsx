interface QuizRelatedArticleProps {
    quizId: number | undefined;
}

import { Tags } from '@/components/commons';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRelatedMDM } from '@/apis/get-relatedMDM';
import { IRelatedMDM } from '@/apis/types/quiz';
import MoreTags from '@/components/icons/MoreTags';
import FoldTags from '@/components/icons/FoldTags';

const QuizRelatedArticle = ({ quizId }: QuizRelatedArticleProps) => {
    const [related, setRelated] = useState<IRelatedMDM[]>([]);
    const [show, setShow] = useState<boolean[]>([]);

    const handleShow = (index: number) => {
        setShow((prev) => {
            const now = [...prev];
            now[index] = !now[index];
            return now;
        });
    };

    useEffect(() => {
        const getQuizData = async () => {
            try {
                if (quizId) {
                    const res = await getRelatedMDM(quizId);
                    if (res) {
                        setRelated(res);
                        if (related.length > 0) {
                            setShow(Array(related.length).fill(false));
                        }
                    }
                }
            } catch (error) {
                console.error();
            }
        };
        getQuizData();
    }, [quizId]);

    return (
        <div className="my-4 px-4 text-left">
            <p className="font-bold my-8">
                <span className="text-blue-500">몇대몇</span> 실생활 금융
            </p>
            <div className="mx-2">
                {related.length === 0 ? (
                    <div>연관 글이 없습니다.</div>
                ) : (
                    related.map((article, index) => (
                        <div key={index} className="mb-12 mt-4">
                            <div className="text-DARK_BLACK">{article.vote} 명 투표</div>
                            <Link to={`/mdm/${article.id}`}>
                                <div className="font-bold text-xl my-2">{article.title}</div>
                            </Link>
                            <div className="flex justify-between my-2">
                                <Tags
                                    tags={
                                        show[index] === true
                                            ? article.tags
                                            : article.tags.slice(0, 3)
                                    }
                                />
                                {article.tags.length > 3 && (
                                    <div className="mt-2">
                                        <button onClick={() => handleShow(index)}>
                                            {show[index] === true ? <FoldTags /> : <MoreTags />}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default QuizRelatedArticle;
