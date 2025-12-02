import type { IElectrolysis, IPaginatedElectrolysis } from '../types';
// Убедись, что путь к mock.ts верный (например, лежит рядом или в src/mock.ts)
// Если файла нет, создай его с тестовыми данными
import { ELECTROLYSIS_MOCK } from './mock'; 

// Интерфейс параметров фильтрации
export interface ElectrolysisListParams {
    title?: string;
    min_voltage?: string;
    max_voltage?: string;
}

const BASE_URL = '/api';

export const getElectrolysisList = async (params?: ElectrolysisListParams): Promise<IPaginatedElectrolysis> => {
    const query = new URLSearchParams();
    
    if (params?.title) query.append('title', params.title);
    if (params?.min_voltage) query.append('min_voltage', params.min_voltage);
    if (params?.max_voltage) query.append('max_voltage', params.max_voltage);

    try {
        // Пытаемся сделать реальный запрос к API
        const res = await fetch(`${BASE_URL}/electrolysis?${query.toString()}`);
        
        // Если сервер ответил ошибкой (например, 500), тоже считаем это поводом для моков
        if (!res.ok) {
             throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
        
        return await res.json();

    } catch (error) {
        console.warn("API недоступен, используем Mock-данные:", error);
        // Возвращаем мок-данные, имитируя успешный ответ
        return Promise.resolve(ELECTROLYSIS_MOCK);
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
        console.warn(`API недоступен для ID ${id}, ищем в Mock-данных:`, error);
        
        // Ищем элемент в моках
        // Приводим id к числу, так как в URL он строка, а в моках обычно число
        const item = ELECTROLYSIS_MOCK.items.find((i) => i.id === Number(id));
        
        if (item) {
            return Promise.resolve(item);
        }
        
        // Если и в моках нет — пробрасываем ошибку дальше
        throw new Error(`Элемент с id ${id} не найден ни в API, ни в Mock-данных`);
    }
};
