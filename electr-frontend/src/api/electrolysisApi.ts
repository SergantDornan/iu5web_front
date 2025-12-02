import type { IElectrolysis, IPaginatedElectrolysis } from '../types';
import { ELECTROLYSIS_MOCK } from './mock'; // <-- ИСПРАВИЛ ПУТЬ (точка вместо двоеточия)

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
        // Пытаемся сделать реальный запрос
        const res = await fetch(`${BASE_URL}/electrolysis?${query.toString()}`);
        
        if (!res.ok) {
            throw new Error(`Server responded with status: ${res.status}`);
        }
        
        return await res.json();

    } catch (error) {
        console.warn('API request failed, switching to MOCK data.', error);
        // Возвращаем мок-данные
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
        console.warn(`API request for ID ${id} failed, looking in MOCK data.`, error);
        
        // ИСПРАВЛЕНИЕ ТИПА: явно указываем тип для i
        const item = ELECTROLYSIS_MOCK.items.find((i: IElectrolysis) => i.id === Number(id));
        
        if (item) {
            return Promise.resolve(item);
        }
        throw new Error(`Item with id ${id} not found in both API and Mocks`);
    }
};
