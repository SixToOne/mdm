import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MdmCard from '@/components/MdmCard';
import { QuizCard } from '@/components/Quiz';
import { IQuiz } from '@/apis/types/quiz';
import { IMdm } from '@/apis/types/mdm';
import { useIntersect } from '@/hooks/useIntersect';
import { getSearchMdm } from '@/apis/get-mdm';
import { getSearchQuiz } from '@/apis/get-quiz';

export type IFeedType = 'mdm' | 'quiz';

interface SearchResultProps {
    keyword: string;
}

const SearchResult = ({ keyword }: SearchResultProps) => {
    const [solved, setSolved] = useState<number[]>([]);
    const [feedType, setFeedType] = useState<IFeedType>('quiz');
    const [mdmData, setMdmData] = useState<IMdm[]>([]);
    const [quizData, setQuizData] = useState<IQuiz[]>([]);
    const [page, setPage] = useState<number>(0);
    const [pageSize] = useState<number>(10);

    useEffect(() => {
        const fetchMdmData = async () => {
            const data = await getSearchMdm(keyword);
            if (data) setMdmData((prev) => [...prev, ...data]);
        };

        const getQuizFeedData = async () => {
            const data = await getSearchQuiz(keyword);
            if (data) setQuizData((prev) => [...prev, ...data]);
        };

        if (feedType === 'mdm') fetchMdmData();
        else getQuizFeedData();
    }, [feedType, page, pageSize]);

    const handleDataChange = (id: number, newData: IMdm) => {
        if (!mdmData) return;
        const updatedData = mdmData.map((item) => {
            if (item.mdmId === id) {
                return { ...item, ...newData };
            }
            return item;
        });
        setMdmData(updatedData);
    };

    const lastItemRef = useIntersect(async (entry, observer) => {
        observer.unobserve(entry.target);
        if (mdmData.length / pageSize === 0) {
            setPage((prev) => prev + 1);
        }
    });

    if (!mdmData) return <>...loading</>;

    return (
        <StyledHome>
            <TabWrapper>
                <TabButton onClick={() => setFeedType('mdm')} selected={feedType === 'mdm'}>
                    몇대몇
                </TabButton>
                <TabButton onClick={() => setFeedType('quiz')} selected={feedType === 'quiz'}>
                    금융 퀴즈
                </TabButton>
            </TabWrapper>
            {feedType === 'mdm' ? (
                <FeedMain>
                    {mdmData.map((data, index) => {
                        return (
                            <Link key={data.mdmId} to={`/mdm/${data.mdmId}`}>
                                <MdmCard
                                    data={data}
                                    $hasBorder={true}
                                    handleDataChange={handleDataChange}
                                />
                                {index === mdmData.length - 1 && <LastItem ref={lastItemRef} />}
                            </Link>
                        );
                    })}
                </FeedMain>
            ) : (
                <FeedMain>
                    {quizData.map((each, index) => {
                        return (
                            <div key={index}>
                                <QuizCard
                                    quiz={each}
                                    quizId={each.id}
                                    solved={solved}
                                    setSolved={setSolved}
                                />
                                <div className="flex justify-between mx-4 mb-4">
                                    <span>해설이 궁금하다면?</span>
                                    <Link to={`/quiz/${each.id}`}>
                                        <span className="text-PRIMARY">자세히 보기</span>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </FeedMain>
            )}
        </StyledHome>
    );
};

const StyledHome = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
`;

const TabWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 16px;
`;

const TabButton = styled.button<{ selected: boolean }>`
    padding: 7px;
    font-size: 16px;
    font-weight: 600;
    ${({ theme, selected }) =>
        selected
            ? `border-bottom: 2px solid ${theme.PRIMARY}; color: ${theme.PRIMARY}`
            : `color: ${theme.DARK_BLACK}`}
`;

const FeedMain = styled.main`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const LastItem = styled.div`
    width: 100%;
    height: 1px;
`;

export default SearchResult;
