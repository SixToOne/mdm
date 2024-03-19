import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import MainLayout from '@/components/layouts/MainLayout';

function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </MainLayout>
    );
}

export default App;
