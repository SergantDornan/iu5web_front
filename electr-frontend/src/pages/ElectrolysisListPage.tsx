import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getElectrolysisList } from '../api/electrolysisApi';
import { CustomBreadcrumbs } from '../components/Breadcrumbs';
import type { IElectrolysis } from '../types';
import DefaultImage from '/mock_images/default.png';


import cartIcon from './cart.png';   // Укажи правильный путь к файлу

//const cartIcon = new URL('mock_images/cart.png', import.meta.env.BASE_URL).href;

export const ElectrolysisListPage = () => {
    const [items, setItems] = useState<IElectrolysis[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [searchTitle, setSearchTitle] = useState(() => {
        return sessionStorage.getItem('electro_search') || '';
    });
    const [minVolt, setMinVolt] = useState(() => {
        return sessionStorage.getItem('electro_min') || '';
    });
    const [maxVolt, setMaxVolt] = useState(() => {
        return sessionStorage.getItem('electro_max') || '';
    });

    const fetchItems = () => {
        setLoading(true);
        getElectrolysisList({ 
            title: searchTitle,
            min_voltage: minVolt, 
            max_voltage: maxVolt  
        })
            .then(data => setItems(data.items || []))
            .catch(err => console.error("Failed to fetch", err))
            .finally(() => setLoading(false));
    };

    // 2. При любом изменении полей — сразу сохраняем в sessionStorage
    useEffect(() => {
        sessionStorage.setItem('electro_search', searchTitle);
        sessionStorage.setItem('electro_min', minVolt);
        sessionStorage.setItem('electro_max', maxVolt);

        // Debounce: ждем 500мс, прежде чем делать запрос (чтобы не спамить при вводе)
        const timer = setTimeout(() => {
            fetchItems();
        }, 500);
        
        return () => clearTimeout(timer);
    }, [searchTitle, minVolt, maxVolt]);

    const crumbs = [
        { label: 'Услуги электролиза', active: true }
    ];

    return (
        <div className="page-container">
            <CustomBreadcrumbs crumbs={crumbs} />

            <div className="header-text">Наши услуги</div>
            <div className="header-line"></div>

            {/* Фильтры */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <input 
                    className="search-input" 
                    style={{ width: '600px' }}
                    type="text" 
                    placeholder="Поиск электролиза..." 
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label>Напряжение (В):</label>
                    <input 
                        type="number" 
                        placeholder="от" 
                        className="search-input"
                        style={{ width: '100px' }}
                        value={minVolt}
                        onChange={(e) => setMinVolt(e.target.value)}
                    />
                    <span>—</span>
                    <input 
                        type="number" 
                        placeholder="до" 
                        className="search-input"
                        style={{ width: '100px' }}
                        value={maxVolt}
                        onChange={(e) => setMaxVolt(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div style={{textAlign: 'center', padding: '50px'}}>Загрузка...</div>
            ) : (
                <div className="cards">
                    {items.length > 0 ? items.map(item => (
                        <div className="custom-card" key={item.id}>
                            <img src={item.image_url || DefaultImage} alt={item.title} />
                            <h3>{item.title}</h3>
                            <p>{item.text.length > 100 ? item.text.slice(0, 100) + '...' : item.text}</p>
                            
                            <div style={{fontSize: '13px', color: '#333', marginBottom: '15px', width: '100%', textAlign: 'left'}}>
                                {item.base_time && <div><b>Время:</b> {item.base_time} мин.</div>}
                                {item.base_voltage && <div><b>Напряжение:</b> {item.base_voltage} В.</div>}
                            </div>

                            <Link to={`/electrolysis/${item.id}`} className="card-btn">
                                Подробнее
                            </Link>
                        </div>
                    )) : (
                        <div style={{textAlign: 'center', color: '#777'}}>Ничего не найдено</div>
                    )}
                </div>
            )}
            
            <div className="order-counter" style={{
                position: 'fixed',
                top: '100px',
                right: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#003366',
                padding: '10px 15px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                color: '#fff',
                zIndex: 990
            }}>
                <span style={{ fontWeight: 'bold' }}>Услуг: 0</span>
                
                <Link to="#" className="card-button" style={{
                    backgroundColor: '#fff',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <img 
                        src={cartIcon}
                        alt="Корзина" 
                        style={{ height: '35px', verticalAlign: 'middle' }} 
                    />
                </Link>
            </div>

            <div style={{textAlign: 'center', margin: '30px 0', color: '#888'}}>
                &copy; Иванов Андрей ИУ5-53Б
            </div>
        </div>
    );
};
