import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import MDM from '@/pages/MDM';
import MainLayout from '@/components/layouts/MainLayout';
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
                    <Route path="/mdm/:id" element={<MDM />} />
                </Routes>
            </MainLayout>
        </>
    );
}

export default App;
