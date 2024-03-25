import { Quiz } from '@/components/Quiz';
import { useState } from 'react';

const Home = () => {
    const [solved, setSolved] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            {/* <div className="flex-grow text-center font-bold text-xl"></div> */}
            <p className="font-bold mb-4">
                <span className="text-PRIMARY">TOP 10</span> 몇대몇
                {/* TOP 10 몇대몇 카드 형태로 배치 with 좌우 버튼 */}
            </p>
            <p className="font-bold my-2">타임라인</p>
            {/* 퀴즈는 여러 피드를 스크롤로 늘어놓기 */}
            <Quiz solved={solved} setSolved={setSolved} />
            <Quiz solved={solved} setSolved={setSolved} />
            <Quiz solved={solved} setSolved={setSolved} />
            <Quiz solved={solved} setSolved={setSolved} />
            <Quiz solved={solved} setSolved={setSolved} />
        </div>
    );
};

export default Home;
