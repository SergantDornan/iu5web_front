import type { IElectrolysis, IPaginatedElectrolysis } from '../types';
import { ELECTROLYSIS_MOCK } from './mock'; // Убедись, что mock.ts рядом

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
        const res = await fetch(`${BASE_URL}/electrolysis?${query.toString()}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch electrolysis list: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.warn('API (PWA) недоступен, подставляем MOCK-данные:', error);
        // PWA должен работать офлайн, поэтому возвращаем моки
        return ELECTROLYSIS_MOCK;
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
        console.warn(`API (PWA) недоступен для id=${id}, ищем в MOCK-данных:`, error);
        
        const item = ELECTROLYSIS_MOCK.items.find(
            (i: IElectrolysis) => i.id === Number(id)
        );

        if (item) {
            return item;
        }
        
        throw new Error(`Элемент с id ${id} не найден ни в API, ни в MOCK-данных`);
    }
};
