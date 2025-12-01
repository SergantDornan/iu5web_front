import { Link } from 'react-router-dom';

export const AppNavbar = () => {
    return (
        <header>
            <Link to="/" className="logo">electrolysis.com</Link>
            
            <Link to="/" className="refToMenu">
                {/* Замени ссылку на свою иконку, если есть локально */}
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/25/25694.png" 
                    alt="Домой" 
                    style={{ filter: 'invert(1)' }} /* Делаем иконку белой */
                />
            </Link>
        </header>
    );
};
