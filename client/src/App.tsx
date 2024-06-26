import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { axiosConfig } from '@/config/axios';
import GlobalStyle from '@/theme/GlobalStyle';
import theme from '@/theme';
import Home from '@/pages/Home';
import MDM from '@/pages/MDM';
import QuizDetail from '@/pages/QuizDetail';
import ArticleWrite from '@/pages/ArticleWrite';
import Search from '@/pages/Search';
import Encyclopedia from './pages/Encyclopedia';
import MainLayout from '@/components/layouts/MainLayout';
import Page404 from '@/pages/Page404';

axiosConfig();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quiz/:id" element={<QuizDetail />} />
                    <Route path="/write" element={<ArticleWrite />} />
                    <Route path="/mdm/:id" element={<MDM />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/financialdic" element={<Encyclopedia />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </MainLayout>
        </ThemeProvider>
    );
}

export default App;
