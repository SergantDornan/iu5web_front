import { Link } from 'react-router-dom';

//const homieIcon = new URL('mock_images/homie.png', import.meta.env.BASE_URL).href;
import homie from './homie.png';

export const AppNavbar = () => {
    return (
        <header>
            <Link to="/" className="logo">electrolysis.com</Link>
            
            <div className="refToMenu">
                <Link to="/">
                    {/* Убедись, что homie.png лежит в public/images/ */}
                    <img 
                        src={homie}
                        alt="Домой" 
                        style={{ height: '30px', verticalAlign: 'middle' }} 
                    />
                </Link>
            </div>
        </header>
    );
};
