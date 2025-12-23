import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
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

    const crumbs = [
        { label: 'Услуги электролиза', path: '/electrolysis' },
        { label: item.title, active: true }
    ];

    // Собираем все медиа файлы в один список для карусели
    // 1. Главное изображение (legacy)
    const slides = [];
    if (item.image_url) {
        slides.push({ id: -1, url: item.image_url, type: 'image' });
    }
    // 2. Дополнительные медиа файлы из новой таблицы
    if (item.media_files && item.media_files.length > 0) {
        // Бэкенд уже сортирует, но на всякий случай сортируем по ID на фронте тоже
        const sortedMedia = [...item.media_files].sort((a, b) => a.id - b.id);
        sortedMedia.forEach(m => slides.push(m));
    }
    
    // Если вообще нет картинок, показываем заглушку
    if (slides.length === 0) {
        slides.push({ id: -99, url: DefaultImage, type: 'image' });
    }

    return (
        <div className="page-container">
            <CustomBreadcrumbs crumbs={crumbs} />

            <div className="header-text">{item.title}</div>
            <div className="header-line"></div>

            <div className="electrCard-card" style={{ maxWidth: '900px' }}> {/* Чуть шире для карусели */}
                
                {/* КАРУСЕЛЬ МЕДИА */}
                <div className="electrCard-header" style={{ padding: 0, overflow: 'hidden' }}>
                    <Carousel interval={null} style={{ backgroundColor: '#f8f9fa' }}>
                        {slides.map((media, index) => (
                            <Carousel.Item key={media.id || index}>
                                {media.type === 'video' ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', backgroundColor: '#000' }}>
                                        <video 
                                            src={media.url} 
                                            controls 
                                            autoPlay 
                                            muted 
                                            loop
                                            style={{ maxWidth: '100%', maxHeight: '400px' }}
                                        />
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                                        <img 
                                            src={media.url} 
                                            alt={`Slide ${index}`}
                                            style={{ 
                                                maxWidth: '100%', 
                                                maxHeight: '400px', 
                                                objectFit: 'contain',
                                                display: 'block' 
                                            }}
                                        />
                                    </div>
                                )}
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                <div style={{ padding: '20px' }}>
                    <p className="electrCard-title" style={{ marginTop: 0 }}>{item.title}</p>
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
            </div>

            <div style={{textAlign: 'center', margin: '30px 0', color: '#888'}}>
                &copy; Иванов Андрей ИУ5-53Б
            </div>
        </div>
    );
};
