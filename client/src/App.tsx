import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/theme/GlobalStyle';
import Home from '@/pages/Home';
import MDM from '@/pages/MDM';
import MainLayout from '@/components/layouts/MainLayout';
import theme from '@/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mdm/:id" element={<MDM />} />
                </Routes>
            </MainLayout>
        </ThemeProvider>
    );
}

export default App;
