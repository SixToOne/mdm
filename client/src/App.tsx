import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import MDM from '@/pages/MDM';
import MainLayout from '@/components/layouts/MainLayout';

function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mdm/:id" element={<MDM />} />
            </Routes>
        </MainLayout>
    );
}

export default App;
