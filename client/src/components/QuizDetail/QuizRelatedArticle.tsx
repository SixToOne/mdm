interface QuizRelatedArticleProps {
    quizId: number | undefined;
}

import { Tags } from '@/components/commons';
import { useState, useEffect } from 'react';
import { getRelatedMDM } from '@/apis/get-relatedMDM';
import { IRelatedMDM } from '@/apis/types/related-MDM';

const QuizRelatedArticle = ({ quizId }: QuizRelatedArticleProps) => {
    const [related, setRelated] = useState<IRelatedMDM[]>([]);

    // quizId가 변할 때만 함수 실행 = useEffect
    useEffect(() => {
        const getQuizData = async () => {
            try {
                if (quizId) {
                    const res = await getRelatedMDM(quizId);
                    if (res) {
                        setRelated(res);
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
            <p className="font-bold mb-4">
                <span className="text-blue-500">몇대몇</span> 실생활 금융
            </p>
            <div>
                {related.length === 0 ? (
                    <div>연관 글이 없습니다.</div>
                ) : (
                    related.map((article, index) => (
                        <div key={index} className="mb-4">
                            <div>{article.vote}명 투표</div>
                            <div>제목: {article.title}</div>
                            <div className="flex justify-between my-4">
                                태그: <Tags tags={article.tags} />
                                <button>
                                    <div>더보기</div>
                                </button>
                            </div>
                        </div>
                    ))
                )}
                {/* <div>
                <div>{related[0]?.vote}명 투표</div>
                <div>제목: {related[0]?.title}</div>
                <div className="flex justify-between my-4">
                    태그:
                    <Tags tags={related[0]?.tags} />
                    <button>
                        <div>더보기</div>
                    </button>
                </div>

                <div>{related[1]?.vote}명 투표</div>
                <div>제목: {related[1]?.title}</div>
                <div className="flex justify-between my-4">
                    태그:
                    <Tags tags={related[1]?.tags} />
                    <button>
                        <div>더보기</div>
                    </button>
                </div>

                <div>{related[2]?.vote}명 투표</div>
                <div>제목: {related[2]?.title}</div>
                <div className="flex justify-between my-4">
                    태그:
                    <Tags tags={related[2]?.tags} />
                    <button>
                        <div>더보기</div>
                    </button>
                </div>
            </div> */}
            </div>
        </div>
    );
};

export default QuizRelatedArticle;
