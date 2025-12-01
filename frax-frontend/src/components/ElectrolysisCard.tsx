import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { IElectrolysis } from '../types';
// Предполагаем, что картинка default.png лежит в public/mock_images/
import DefaultImage from '/mock_images/default.png'; 
import './styles/FactorCard.css'; // Стили можно оставить старые или переименовать

interface Props {
    item: IElectrolysis;
}

export const ElectrolysisCard = ({ item }: Props) => {
    const displayImage = item.image_url || DefaultImage;

    return (
        <Card className="factor-card h-100 shadow-sm">
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <Card.Img 
                    variant="top" 
                    src={displayImage} 
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
            </div>
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title>{item.title}</Card.Title>
                    <Badge bg={item.status ? "success" : "secondary"}>
                        {item.status ? "Активен" : "Архив"}
                    </Badge>
                </div>
                
                <Card.Text className="text-truncate mb-3" style={{ maxHeight: '3em' }}>
                    {item.text}
                </Card.Text>

                <div className="mt-auto">
                    <div className="d-flex justify-content-between small text-muted mb-3">
                        <span>Напряжение: <b>{item.base_voltage} В</b></span>
                        <span>Время: <b>{item.base_time} мин</b></span>
                    </div>
                    
                    <Link to={`/electrolysis/${item.id}`} className="d-block">
                        <Button variant="outline-primary" className="w-100">
                            Подробнее
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};
