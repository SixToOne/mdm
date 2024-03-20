import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import MainLayout from '@/components/layouts/MainLayout';
import BottomNav from '@/components/BottomNav';
import QuizDetail from '@/pages/QuizDetail';
import ArticleWrite from '@/pages/ArticleWrite';

function App() {
    return (
        <>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quiz/*" element={<QuizDetail />} />
                    <Route path="/mdm/new" element={<ArticleWrite />} />
                </Routes>
                {/* 하단 바 */}
                <div className="mt-auto border-2 border-stone-200">
                    <BottomNav />
                </div>
            </MainLayout>
        </>
    );
}

export default App;
