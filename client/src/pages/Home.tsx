import MdmCard from '@/components/MdmCard';
import { Quiz } from '@/components/Quiz';
import { LeftCard, RightCard } from '@/components/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [solved, setSolved] = useState<number[]>([]);
    // const [feeds, setFeeds] = useState([]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* <div className="flex-grow text-center font-bold text-xl"></div> */}
            <p className="font-bold mb-4">
                <div className="my-4">
                    <span className="text-PRIMARY">TOP 10</span> 몇대몇
                </div>
                {/* TOP 10 몇대몇 카드 형태로 배치 with 좌우 버튼 */}

                {/* 페이지 구현 위해 임시로 아이콘 및 컴포넌트 배치함 */}
                <div className="flex items-center">
                    <LeftCard />
                    <MdmCard />
                    <RightCard />
                </div>
            </p>
            <p className="font-bold my-4">타임라인</p>

            {/* 추후 피드 api로 바꿔서 늘어놓기 */}
            {/* 컴포넌트 클릭 시 해당 상세로 이동하도록 */}
            <Link to="/quiz/1">
                <div className="text-end">| 자세히 |</div>
            </Link>
            <Quiz solved={solved} setSolved={setSolved} quizId={1} />

            <Link to="/quiz/2">
                <div className="text-end">| 자세히 |</div>
            </Link>
            <Quiz solved={solved} setSolved={setSolved} quizId={2} />

            <Link to="/quiz/3">
                <div className="text-end">| 자세히 |</div>
            </Link>
            <Quiz solved={solved} setSolved={setSolved} quizId={3} />

            <Link to="/quiz/4">
                <div className="text-end">| 자세히 |</div>
            </Link>
            <Quiz solved={solved} setSolved={setSolved} quizId={4} />

            <Link to="/quiz/5">
                <div className="text-end">| 자세히 |</div>
            </Link>
            <Quiz solved={solved} setSolved={setSolved} quizId={5} />
        </div>
    );
};

export default Home;
