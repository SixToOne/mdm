/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MdmCard from '@/components/MdmCard';
import { QuizCard } from '@/components/Quiz';
import { IQuiz } from '@/apis/types/quiz';
import { IMdm } from '@/apis/types/mdm';
import { getQuizFeeds } from '@/apis/get-quizFeeds';
import { getMdmFeed } from '@/apis/get-feed';
import { useIntersect } from '@/hooks/useIntersect';

export type IFeedType = 'mdm' | 'quiz';

const Home = () => {
    const [feedType, setFeedType] = useState<IFeedType>('mdm');

    const [mdmData, setMdmData] = useState<IMdm[]>([]);
    const [page, setPage] = useState<number>(0);
    const [pageSize] = useState<number>(3);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const [quizData, setQuizData] = useState<IQuiz[]>([]);
    const [solved, setSolved] = useState<number[]>([]);

    useEffect(() => {
        fetchMdmData();
    }, [page]);

    const fetchMdmData = useCallback(async () => {
        const { mdmFeeds } = await getMdmFeed(page, pageSize);
        if (mdmFeeds && mdmFeeds.length > 0) {
            setMdmData((prev) => [...prev, ...mdmFeeds]);
        } else {
            setHasMore(false);
        }
    }, [page, pageSize]);

    const fetchQuizData = useCallback(async () => {
        const { quizFeeds } = await getQuizFeeds(page, pageSize);
        if (quizFeeds) setQuizData((prev) => [...prev, ...quizFeeds]);
    }, [page, pageSize]);

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

    const loadMore = () => {
        if (hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    const lastItemRef = useIntersect(async (entry, observer) => {
        observer.unobserve(entry.target);
        console.log(page);
        loadMore();
    });

    const goToTop = () => {
        focusRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const focusRef = useRef<HTMLDivElement>(null);

    if (!mdmData) return <>...loading</>;

    return (
        <StyledHome>
            <TabWrapper ref={focusRef}>
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
                    <button
                        onClick={goToTop}
                        className="text-LIGHT_BLACK font-bold bg-WHITE border-3 border-solid border-BORDER_LIGHT absolute rounded-full px-4 py-2 m-8 bottom-0 right-0"
                    >
                        ↑
                    </button>
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
                    <button
                        onClick={goToTop}
                        className="text-LIGHT_BLACK font-bold bg-WHITE border-3 border-solid border-BORDER_LIGHT absolute rounded-full px-4 py-2 m-8 bottom-0 right-0"
                    >
                        ↑
                    </button>
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

export default Home;
