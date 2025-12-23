import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

export const HomePage = () => {
    return (
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

            {/* Original Main Content */}
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: '#003366', fontSize: '40px', marginBottom: '20px' }}>
                    electrolysis.com
                </h1>
                <div className="header-line"></div>
                
                <p style={{ fontSize: '20px', color: '#555', maxWidth: '800px', margin: '0 auto 40px auto' }}>
                    Добро пожаловать на сервис профессиональных услуг электролиза.
                </p>

                <Link to="/electrolysis" className="card-btn" style={{ fontSize: '18px', padding: '15px 30px' }}>
                    Каталог услуг
                </Link>
            </div>
        </div>
    );
};
