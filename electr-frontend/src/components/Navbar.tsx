import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
export const AppNavbar = () => {

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


    return (
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