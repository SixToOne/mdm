import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MdmCard from '@/components/MdmCard';
import { Quiz } from '@/components/Quiz';
import { getQuizFeeds } from '@/apis/get-quizFeeds';
import { IQuiz } from '@/apis/types/quiz';
import { IMdm } from '@/apis/types/mdm-post ';
import { getMdmFeed } from '@/apis/get-feed';

export type IFeedType = 'mdm' | 'quiz';

const Home = () => {
    const [solved, setSolved] = useState<number[]>([]);
    const [feedType, setFeedType] = useState<IFeedType>('mdm');
    const [mdmData, setMdmData] = useState<IMdm[]>();
    const [quizData, setQuizData] = useState<IQuiz[]>([]);

    useEffect(() => {
        const fetchMdmData = async () => {
            const { mdmFeeds } = await getMdmFeed(1, 10);
            if (mdmFeeds) setMdmData(mdmFeeds);
        };

        const getQuizFeedData = async () => {
            try {
                const res = await getQuizFeeds(0, 10);
                if (res) {
                    setQuizData((prev) => [...prev, ...res]);
                }
            } catch (error) {
                console.error();
            }
        };
        if (feedType === 'mdm') fetchMdmData();
        else getQuizFeedData();
    }, [feedType]);

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

    return (
        <StyledHome>
            <TabWrapper>
                <TabButton onClick={() => setFeedType('mdm')} selected={feedType === 'mdm'}>
                    유머
                </TabButton>
                <TabButton onClick={() => setFeedType('quiz')} selected={feedType === 'quiz'}>
                    금융 퀴즈
                </TabButton>
            </TabWrapper>
            {feedType === 'mdm' ? (
                <FeedMain>
                    {mdmData?.map((data, index) => (
                        <MdmCard
                            key={index}
                            data={data}
                            border={true}
                            handleDataChange={handleDataChange}
                        />
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
