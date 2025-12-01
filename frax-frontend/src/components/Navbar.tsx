import { Link } from 'react-router-dom';

export const AppNavbar = () => {
    return (
        <header>
            <Link to="/" className="logo">electrolysis.com</Link>
            
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '18px', marginRight: '20px' }}>
                Домой
            </Link>
        </header>
    );
};
