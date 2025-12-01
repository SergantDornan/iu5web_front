import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px 20px' }}>
            <h1 style={{ color: '#003366', fontSize: '40px', marginBottom: '20px' }}>
                Добро пожаловать на electrolysis.com
            </h1>
            <div className="header-line"></div>
            
            <p style={{ fontSize: '20px', color: '#555', maxWidth: '800px', margin: '0 auto 40px auto' }}>
                Мы предоставляем профессиональные услуги электролиза: хромирование, меднение, никелирование и многое другое.
                Гарантия качества и точность соблюдения технологий.
            </p>

            <Link to="/electrolysis" style={{
                display: 'inline-block',
                backgroundColor: '#003366',
                color: '#fff',
                padding: '15px 30px',
                fontSize: '18px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}>
                Перейти к услугам
            </Link>
        </div>
    );
};
