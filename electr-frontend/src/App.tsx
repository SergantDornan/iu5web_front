import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppNavbar } from './components/Navbar';
import { HomePage } from './pages/ElectrHomePage';
// Убедись, что имена файлов совпадают с этими путями:
import { ElectrolysisListPage } from './pages/ElectrolysisListPage';
import { ElectrolysisDetailPage } from './pages/ElectrolysisDetailPage';

const MainLayout = () => (
    <>
        <AppNavbar />
        <main>
            <Outlet />
        </main>
    </>
);

function App() {
    return (
        // --- ИЗМЕНЕНИЕ: Добавлен basename для GitHub Pages ---
        // ЗАМЕНИ '/electr-frontend' НА НАЗВАНИЕ СВОЕГО РЕПОЗИТОРИЯ
        <BrowserRouter basename="/iu5web_front">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<MainLayout />}>
                    <Route path="/electrolysis" element={<ElectrolysisListPage />} />
                    <Route path="/electrolysis/:id" element={<ElectrolysisDetailPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
