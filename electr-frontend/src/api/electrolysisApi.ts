import type { IElectrolysis, IPaginatedElectrolysis } from '../types';
import { ELECTROLYSIS_MOCK } from './mock';

export interface ElectrolysisListParams {
    title?: string;
    min_voltage?: string;
    max_voltage?: string;
}

interface IOrder {
    id: number;
    status: number;
    calculated_value?: number;
    electr_links?: Array<{ electrolysis_id: number }>;
}

const BASE_URL = '/api';

// --- КОСТЫЛЬ ДЛЯ АВТО-ЛОГИНА ---
// Функция проверяет токен и если его нет, сама логинится
const ensureAuth = async (): Promise<string | null> => {
    let token = localStorage.getItem('token');
    
    // Если токен есть, считаем что ок (можно добавить проверку срока действия, но для костыля так сойдет)
    if (token) return token;

    try {
        console.log("Автоматический логин...");
        // Хардкод кредов из вашего SQL дампа (andrew / andrew)
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'admin_',
                password: 'admin_'
            })
        });

        if (!res.ok) {
            console.error("Auto-login failed:", res.status);
            return null;
        }

        const data = await res.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log("Токен получен автоматически!");
            return data.token;
        }
    } catch (e) {
        console.error("Login error:", e);
    }
    return null;
};
// --------------------------------

export const getOrderById = async (id: number): Promise<IOrder | null> => {
    try {
        // Сначала убеждаемся, что мы залогинены
        const token = await ensureAuth();
        
        const headers: Record<string, string> = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        } else {
            // Если токен так и не получили, нет смысла слать запрос - вернет 401
            console.warn("Нет токена для запроса заказа");
            return null;
        }
        
        // Исправленный путь: /order/ (единственное число)
        const res = await fetch(`${BASE_URL}/order/${id}`, { headers });
        
        if (!res.ok) {
            // Если сервер вернул 401, возможно токен протух.
            // Можно удалить токен, чтобы в след раз перелогиниться
            if (res.status === 401) localStorage.removeItem('token');
            return null;
        } 
        
        return await res.json();
    } catch (error) {
        console.warn(`Failed to fetch order ${id}:`, error);
        return null;
    }
};

export const getElectrolysisList = async (
    params?: ElectrolysisListParams
): Promise<IPaginatedElectrolysis> => {
    const query = new URLSearchParams();

    if (params?.title) query.append('title', params.title);
    if (params?.min_voltage) query.append('min_voltage', params.min_voltage);
    if (params?.max_voltage) query.append('max_voltage', params.max_voltage);

    try {
        const res = await fetch(`${BASE_URL}/electrolysis?${query.toString()}`);

        if (!res.ok) {
            throw new Error(`Server responded with status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.warn('API недоступен, подставляем MOCK-данные:', error);
        
        let filteredItems = [...ELECTROLYSIS_MOCK.items];

        if (params?.title) {
            const searchLower = params.title.toLowerCase();
            filteredItems = filteredItems.filter(item => 
                item.title.toLowerCase().includes(searchLower)
            );
        }

        if (params?.min_voltage) {
            const minV = Number(params.min_voltage);
            if (!isNaN(minV)) {
                filteredItems = filteredItems.filter(item => 
                    item.base_voltage !== undefined && item.base_voltage >= minV
                );
            }
        }

        if (params?.max_voltage) {
            const maxV = Number(params.max_voltage);
            if (!isNaN(maxV)) {
                filteredItems = filteredItems.filter(item => 
                    item.base_voltage !== undefined && item.base_voltage <= maxV
                );
            }
        }

        return {
            items: filteredItems
        } as IPaginatedElectrolysis; 
    }
};

export const getElectrolysisById = async (id: string): Promise<IElectrolysis> => {
    try {
        const res = await fetch(`${BASE_URL}/electrolysis/${id}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch electrolysis with id ${id}`);
        }

        return await res.json();
    } catch (error) {
        console.warn(`API недоступен для id=${id}, ищем в MOCK-данных:`, error);
        const item = ELECTROLYSIS_MOCK.items.find(
            (i: IElectrolysis) => i.id === Number(id)
        );
        if (item) return item;
        throw new Error(`Элемент с id ${id} не найден`);
    }
};
