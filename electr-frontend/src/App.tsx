import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppNavbar } from './components/Navbar';
import { HomePage } from './pages/ElectrHomePage';
import { ElectrolysisListPage } from './pages/ElectrolysisListPage';
import { ElectrolysisDetailPage } from './pages/ElectrolysisDetailPage';
// !!! ИМПОРТ !!!
import { OrdersPage } from './pages/OrdersPage';

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
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<MainLayout />}>
                    <Route path="/electrolysis" element={<ElectrolysisListPage />} />
                    <Route path="/electrolysis/:id" element={<ElectrolysisDetailPage />} />
                    
                    {/* !!! НОВЫЙ МАРШРУТ !!! */}
                    <Route path="/orders" element={<OrdersPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
