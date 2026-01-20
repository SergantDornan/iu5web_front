import type { IElectrolysis, IPaginatedElectrolysis } from '../types';
import { ELECTROLYSIS_MOCK } from './mock'; // mock.ts рядом с этим файлом

// Интерфейс параметров фильтрации
export interface ElectrolysisListParams {
    title?: string;
    min_voltage?: string;
    max_voltage?: string;
}

// Можно оставить IP, как у тебя сейчас
const BASE_URL = 'http://192.168.1.148:8080/api';

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

        // Фильтр по названию
        if (params?.title) {
            const searchLower = params.title.toLowerCase();
            filteredItems = filteredItems.filter(item => 
                item.title.toLowerCase().includes(searchLower)
            );
        }

        // Фильтр по минимальному напряжению
        if (params?.min_voltage) {
            const minV = Number(params.min_voltage);
            if (!isNaN(minV)) {
                filteredItems = filteredItems.filter(item => 
                    item.base_voltage !== undefined && item.base_voltage >= minV
                );
            }
        }

        // Фильтр по максимальному напряжению
        if (params?.max_voltage) {
            const maxV = Number(params.max_voltage);
            if (!isNaN(maxV)) {
                filteredItems = filteredItems.filter(item => 
                    item.base_voltage !== undefined && item.base_voltage <= maxV
                );
            }
        }

        // Возвращаем объект, соответствующий твоему интерфейсу IPaginatedElectrolysis
        // Обычно это { items: ... }
        return {
            items: filteredItems
            // Если TS будет ругаться, что не хватает 'total', раскомментируй следующую строку:
            // total: filteredItems.length
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

        if (item) {
            return item;
        }

        throw new Error(`Элемент с id ${id} не найден ни в API, ни в MOCK-данных`);
    }
};