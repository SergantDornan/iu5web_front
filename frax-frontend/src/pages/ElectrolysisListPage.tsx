import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getElectrolysisList } from '../api/electrolysisApi';
import type { IElectrolysis } from '../types';
import DefaultImage from '/mock_images/default.png'; // Убедись, что путь верный

export const ElectrolysisListPage = () => {
    const [items, setItems] = useState<IElectrolysis[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTitle, setSearchTitle] = useState('');

    useEffect(() => {
        setLoading(true);
        getElectrolysisList({ title: searchTitle })
            .then(data => setItems(data.items || []))
            .finally(() => setLoading(false));
    }, [searchTitle]); // Запрос при каждом изменении поиска

    return (
        <>
            {/* Хедер и Футер уже есть в App.tsx */}
            
            <div className="header-text">Наши услуги</div>
            <div className="header-line"></div>

            <div className="search-wrapper">
                <input 
                    className="search-input" 
                    type="text" 
                    placeholder="Поиск по услугам электролиза..." 
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
            </div>

            {loading ? (
                <div style={{textAlign: 'center', padding: '50px'}}>Загрузка...</div>
            ) : (
                <div className="cards">
                    {items.map(item => (
                        <div className="custom-card" key={item.id}>
                            <img 
                                src={item.image_url || DefaultImage} 
                                alt={item.title} 
                            />
                            <h3>{item.title}</h3>
                            <p>{item.text.length > 100 ? item.text.slice(0, 100) + '...' : item.text}</p>
                            
                            {/* Технические параметры */}
                            <div style={{fontSize: '13px', color: '#333', marginBottom: '15px', width: '100%', textAlign: 'left'}}>
                                {item.base_time && <div><b>Время:</b> {item.base_time} мин.</div>}
                                {item.base_voltage && <div><b>Напряжение:</b> {item.base_voltage} В.</div>}
                                {item.material_coefficient && <div><b>Коэфф. мат.:</b> {item.material_coefficient}</div>}
                            </div>

                            <Link to={`/electrolysis/${item.id}`} className="card-btn">
                                Подробнее
                            </Link>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Кнопка корзины (декор) */}
            <div className="order-counter">
                <span>Услуг: {items.length}</span>
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" 
                    alt="Корзина" 
                    style={{height: '24px', filter: 'invert(1)'}}
                />
            </div>

            <div style={{textAlign: 'center', margin: '20px 0', color: '#888'}}>
                &copy; Иванов Андрей ИУ5-53Б
            </div>
        </>
    );
};
