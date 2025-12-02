import { Link } from 'react-router-dom';

export const AppNavbar = () => {
    return (
        <header>
            <Link to="/" className="logo">electrolysis.com</Link>
            
            <div className="refToMenu">
                <Link to="/">
                    {/* Убедись, что homie.png лежит в public/images/ */}
                    <img 
                        src="/public/mock_images/homie.png" 
                        alt="Домой" 
                        style={{ height: '30px', verticalAlign: 'middle' }} 
                    />
                </Link>
            </div>
        </header>
    );
};
