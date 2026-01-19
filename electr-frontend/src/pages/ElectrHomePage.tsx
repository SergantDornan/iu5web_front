import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { useState, useEffect } from "react";

export const HomePage = () => {
    // --- Логика для хедера (переливание цветов) ---
    const [colorIndex, setColorIndex] = useState(0);

    const colors = [
        "#FF6B6B", // Красный
        "#4ECDC4", // Бирюзовый
        "#45B7D1", // Голубой
        "#FFA07A", // Лососевый
        "#98D8C8", // Мятный
        "#F7DC6F", // Желтый
        "#BB8FCE", // Фиолетовый
        "#85C1E2", // Небесно-голубой
        "#F8B739", // Оранжевый
        "#52B788"  // Зеленый
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);
    // ----------------------------------------------

    return (
        <div>
            {/* Хедер */}
            <header>
                <Link 
                    to="/" 
                    className="logo" 
                    style={{ 
                        color: colors[colorIndex],
                        transition: "color 1s ease-in-out"
                    }}
                >
                    electrolysis.com
                </Link>
                
                <div className="refToMenu">
                    <Link 
                        to="/electrolysis" 
                        style={{ 
                            textDecoration: 'none', 
                            color: 'white', // Изменено на белый
                            fontWeight: 'bold', 
                            fontSize: '18px' 
                        }}
                    >
                        Каталог услуг
                    </Link>
                </div>
            </header>

            <div style={{ padding: '40px 20px' }}>
                {/* Carousel Section */}
                <div style={{ maxWidth: '1000px', margin: '0 auto 60px auto' }}>
                    <Carousel>
                        <Carousel.Item interval={3000}>
                            <div style={{
                                height: '400px',
                                backgroundColor: '#003366',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '12px',
                                padding: '20px'
                            }}>
                                <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
                                    Быстрый расчет продуктов электролиза!
                                </h2>
                                <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>
                                    Точные вычисления за считанные секунды
                                </p>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item interval={3000}>
                            <div style={{
                                height: '400px',
                                backgroundColor: '#0056b3', // Slightly lighter blue for variety
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '12px',
                                padding: '20px'
                            }}>
                                <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
                                    Разнообразные реакции!
                                </h2>
                                <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>
                                    Большая база химических процессов
                                </p>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item interval={3000}>
                            <div style={{
                                height: '400px',
                                backgroundColor: '#004085', // Darker blue accent
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '12px',
                                padding: '20px'
                            }}>
                                <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
                                    Удобный интерфейс для химии!
                                </h2>
                                <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>
                                    Простое управление сложными расчетами
                                </p>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>

                {/* Main Content */}
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ color: '#003366', fontSize: '40px', marginBottom: '20px' }}>
                        electrolysis.com
                    </h1>
                    <div className="header-line"></div>
                    
                    <p style={{ fontSize: '20px', color: '#555', maxWidth: '800px', margin: '0 auto 40px auto' }}>
                        Добро пожаловать на сервис профессиональных услуг электролиза.
                    </p>
                </div>
            </div>
        </div>
    );
};
