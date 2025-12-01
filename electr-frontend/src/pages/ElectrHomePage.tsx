import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
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
    );
};
