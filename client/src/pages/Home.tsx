import { Quiz } from '@/components/Quiz';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* <div className="flex-grow text-center font-bold text-xl"></div> */}
            <p className="font-bold mb-4">
                <span className="text-PRIMARY">TOP 10</span> 몇대몇
            </p>
            <p className="font-bold my-2">타임라인</p>
            {/* 퀴즈는 여러 피드를 스크롤로 늘어놓기 */}
            <Quiz />
            <Quiz />
            <Quiz />
            <Quiz />
            <Quiz />
        </div>
    );
};

export default Home;
