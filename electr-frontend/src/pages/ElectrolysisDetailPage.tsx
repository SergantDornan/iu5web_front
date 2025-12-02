import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getElectrolysisById } from '../api/electrolysisApi';
import { CustomBreadcrumbs } from '../components/Breadcrumbs';
import type { IElectrolysis } from '../types';
import DefaultImage from '/mock_images/default.png';

export const ElectrolysisDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<IElectrolysis | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getElectrolysisById(id)
                .then(data => setItem(data))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div style={{textAlign: 'center', marginTop: '100px'}}>Загрузка...</div>;
    if (!item) return <div style={{textAlign: 'center', marginTop: '100px'}}>Услуга не найдена</div>;

    // Формируем путь крошек
    const crumbs = [
        { label: 'Услуги электролиза', path: '/electrolysis' },
        { label: item.title, active: true }
    ];

    return (
        <div className="page-container">
            <CustomBreadcrumbs crumbs={crumbs} />

            <div className="header-text">{item.title}</div>
            <div className="header-line"></div>

            <div className="electrCard-card">
                <div className="electrCard-header">
                    <img src={item.image_url || DefaultImage} alt={item.title} />
                    <p className="electrCard-title">{item.title}</p>
                </div>
                
                <p className="electrCard-text">{item.text}</p>
                
                <div className="electrCard-params">
                    {item.base_time && <p><b>Базовое время:</b> {item.base_time} мин.</p>}
                    {item.base_voltage && <p><b>Базовое напряжение:</b> {item.base_voltage} В.</p>}
                    {item.material_coefficient && <p><b>Коэффициент материала:</b> {item.material_coefficient}</p>}
                </div>

                <Link to="/electrolysis" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none', color: '#003366', fontWeight: 'bold' }}>
                    ← Назад к списку
                </Link>
            </div>

            <div style={{textAlign: 'center', margin: '30px 0', color: '#888'}}>
                &copy; Иванов Андрей ИУ5-53Б
            </div>
        </div>
    );
};
