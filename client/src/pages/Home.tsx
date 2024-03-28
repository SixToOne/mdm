import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MdmCard from '@/components/MdmCard';
import { getQuizFeeds } from '@/apis/get-quizFeeds';
import { Quiz } from '@/components/Quiz';
import { IQuiz } from '@/apis/types/quiz';
import { Link } from 'react-router-dom';

export type IFeedType = 'mdm' | 'quiz';

const Home = () => {
    const [solved, setSolved] = useState<number[]>([]);
    const [feedType, setFeedType] = useState<IFeedType>('mdm');
    const [mdmData] = useState<number[]>(Array.from({ length: 10 }, () => 1));
    const [quizData, setQuizData] = useState<IQuiz[]>([]);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);

    // page, size가 변할 때만 함수 실행 = useEffect
    useEffect(() => {
        const getQuizFeedData = async () => {
            try {
                const res = await getQuizFeeds(page, size);
                if (res) {
                    setQuizData((prev) => [...prev, ...res]);
                }
            } catch (error) {
                console.error();
            }
        };
        getQuizFeedData();
    }, [page, size]);

    // 무한 스크롤 시도 (지워도 무방)
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
            setPage((prevPage) => prevPage + 1);
            setSize((prevSize) => prevSize + size);
        }
    };
    // 무한 스크롤 시도 (지워도 무방)
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 유머 => mdm, 금융 => 퀴즈로 수정
    return (
        <StyledHome>
            <TabWrapper>
                <TabButton onClick={() => setFeedType('mdm')} selected={feedType === 'mdm'}>
                    유머
                </TabButton>
                <TabButton onClick={() => setFeedType('quiz')} selected={feedType === 'quiz'}>
                    퀴즈
                </TabButton>
            </TabWrapper>
            {feedType === 'mdm' ? (
                <FeedMain>
                    {mdmData.map((data, index) => (
                        <MdmCard key={index} />
                    ))}
                </FeedMain>
            ) : (
                <FeedMain>
                    {quizData.map((each, index) => (
                        <div key={index}>
                            <Quiz quizId={each.id} solved={solved} setSolved={setSolved} />
                            <div className="flex justify-between mx-4">
                                <span>해설이 궁금하다면?</span>
                                <Link to={`/quiz/${each.id}`}>
                                    <span className="text-PRIMARY">자세히 보기</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </FeedMain>
            )}
        </StyledHome>
    );
};

const StyledHome = styled.div`
    width: 100%;
    height: 100%;
`;

const TabWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
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
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export default Home;
