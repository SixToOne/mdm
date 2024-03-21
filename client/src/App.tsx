import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/theme/GlobalStyle';
import theme from '@/theme';
import Home from '@/pages/Home';
import MDM from '@/pages/MDM';
import QuizDetail from '@/pages/QuizDetail';
import ArticleWrite from '@/pages/ArticleWrite';
import MainLayout from '@/components/layouts/MainLayout';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quiz/*" element={<QuizDetail />} />
                    <Route path="/mdm/new" element={<ArticleWrite />} />
                    <Route path="/mdm/:id" element={<MDM />} />
                </Routes>
            </MainLayout>
        </ThemeProvider>
    );
}

export default App;
