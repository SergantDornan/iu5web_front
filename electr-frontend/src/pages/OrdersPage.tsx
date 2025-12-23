import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Badge, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Добавил для редиректа

// === CONSTANTS ===
const STATUS_DRAFT = 1;
const STATUS_FORMED = 3;
const STATUS_COMPLETED = 4;
const STATUS_REJECTED = 5;

const STATUS_LABELS: Record<number, string> = {
    [STATUS_DRAFT]: "Черновик",
    [STATUS_FORMED]: "Сформирована",
    [STATUS_COMPLETED]: "Завершена",
    [STATUS_REJECTED]: "Отклонена",
};

// === INTERFACES ===
interface Order {
    id: number;
    status: number;
    creation_date: string;
    creator_id: number;
    email: string;
    calculated_value?: number | null; 
}

interface User {
    id: number;
    username: string;
    moderator: boolean;
}

// === COMPONENT ===
export const OrdersPage = () => {
    // State
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
    
    // Filters
    const [statusFilter, setStatusFilter] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [creatorFilter, setCreatorFilter] = useState("");

    // User State
    const [isModerator, setIsModerator] = useState(false);
    const [isAuth, setIsAuth] = useState(false); // Проверка авторизации

    const navigate = useNavigate();

    // === CHECK AUTH ===
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        
        if (token && userStr) {
            setIsAuth(true);
            try {
                const user: User = JSON.parse(userStr);
                setIsModerator(user.moderator);
                console.log("Current User:", user); // LOG
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        } else {
            setIsAuth(false);
            console.warn("No token found in localStorage");
        }
    }, []);

    // === FETCH DATA ===
    const fetchOrders = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return; // Если нет токена, ничего не делаем

        console.log("Fetching orders..."); // LOG: Видим, что функция вызвалась

        try {
            const params: any = {};
            if (statusFilter) params.status = statusFilter;
            if (dateFrom) params.from = dateFrom;
            if (dateTo) params.to = dateTo;

            // Используем полный путь, если прокси не настроен, или относительный, если настроен.
            // Лучше оставить относительный /api, но убедитесь что vite proxy работает.
            const response = await axios.get<Order[]>("/api/order", {
                headers: { Authorization: `Bearer ${token}` },
                params: params
            });

            console.log("Orders loaded:", response.data); // LOG: Видим, что пришло с бэка
            setOrders(response.data || []);
            setError(null);
        } catch (err: any) {
            console.error("Error fetching orders:", err);
            // Показываем ошибку только если это не 401 (чтобы не спамить при протухшем токене)
            if (err.response?.status !== 401) {
                setError("Ошибка загрузки данных: " + (err.message || "Unknown error"));
            }
        }
    }, [statusFilter, dateFrom, dateTo]);

    // Initial Load & Polling
    useEffect(() => {
        if (!isAuth) return;

        setIsLoading(true);
        fetchOrders().finally(() => setIsLoading(false));

        const intervalId = setInterval(fetchOrders, 3000);
        return () => clearInterval(intervalId);
    }, [fetchOrders, isAuth]);


    // === ACTIONS ===
    const handleResolve = async (orderId: number, action: "complete" | "reject") => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`/api/order/${orderId}/resolve`, 
                { action },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchOrders();
            alert(action === "complete" ? "Заявка одобрена!" : "Заявка отклонена.");
        } catch (err: any) {
            console.error(err);
            alert("Ошибка: " + (err.response?.data?.description || "Не удалось изменить статус"));
        }
    };

    // Rendering
    if (!isAuth) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="warning">
                    Вы не авторизованы. Пожалуйста, войдите в систему.
                </Alert>
                <Button onClick={() => navigate("/")}>На главную (Логин)</Button>
            </Container>
        );
    }

    const filteredOrders = orders.filter(order => {
        if (!creatorFilter) return true;
        return String(order.creator_id).includes(creatorFilter);
    });

    return (
        <Container style={{ marginTop: '20px', paddingBottom: '50px' }}>
            <h2 className="mb-4">
                Список заявок {isModerator && <Badge bg="danger">Модератор</Badge>}
                {isLoading && <Spinner animation="border" size="sm" className="ms-3" />}
            </h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {/* FILTERS */}
            {isModerator && (
                <Card className="mb-4 p-3 bg-light">
                    <Card.Title>Фильтры</Card.Title>
                    <Form>
                        <Row className="align-items-end">
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Статус</Form.Label>
                                    <Form.Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                                        <option value="">Все</option>
                                        <option value={STATUS_FORMED}>Сформирована</option>
                                        <option value={STATUS_COMPLETED}>Завершена</option>
                                        <option value={STATUS_REJECTED}>Отклонена</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Дата с</Form.Label>
                                    <Form.Control type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Дата по</Form.Label>
                                    <Form.Control type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>ID Создателя</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Поиск..." 
                                        value={creatorFilter} 
                                        onChange={e => setCreatorFilter(e.target.value)} 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            )}

            {/* LIST */}
            <Row xs={1} md={1} className="g-4">
                {filteredOrders.length === 0 ? (
                    <Col>
                        <Alert variant="info">
                            Заявок не найдено. (Либо база пуста, либо фильтры скрыли всё)
                        </Alert>
                    </Col>
                ) : (
                    filteredOrders.map(order => (
                        <Col key={order.id}>
                            <Card border={
                                order.status === STATUS_COMPLETED ? "success" : 
                                order.status === STATUS_REJECTED ? "danger" : "secondary"
                            }>
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <span>Заявка #{order.id} от {new Date(order.creation_date).toLocaleDateString()}</span>
                                    <Badge bg={
                                        order.status === STATUS_COMPLETED ? "success" : 
                                        order.status === STATUS_FORMED ? "warning" : 
                                        order.status === STATUS_REJECTED ? "danger" : "secondary"
                                    }>
                                        {STATUS_LABELS[order.status] || "Неизвестно"}
                                    </Badge>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={8}>
                                            <Card.Text>
                                                <strong>Создатель ID:</strong> {order.creator_id}<br/>
                                                <strong>Email:</strong> {order.email}
                                            </Card.Text>
                                            
                                            <div className="p-2 mt-2 border rounded bg-light">
                                                <strong>Результат расчета: </strong>
                                                {order.calculated_value ? (
                                                    <span className="text-success fw-bold fs-5">
                                                        {order.calculated_value}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted fst-italic">
                                                        {order.status === STATUS_COMPLETED ? "Вычисляется..." : "—"}
                                                    </span>
                                                )}
                                            </div>
                                        </Col>
                                        
                                        <Col md={4} className="d-flex align-items-center justify-content-end gap-2">
                                            {isModerator && order.status === STATUS_FORMED && (
                                                <>
                                                    <Button variant="success" onClick={() => handleResolve(order.id, "complete")}>
                                                        Одобрить
                                                    </Button>
                                                    <Button variant="danger" onClick={() => handleResolve(order.id, "reject")}>
                                                        Отклонить
                                                    </Button>
                                                </>
                                            )}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};
