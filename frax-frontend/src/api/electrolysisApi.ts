import type { IPaginatedElectrolysis, IElectrolysis } from '../types';
import { ELECTROLYSIS_MOCK } from './mock';

const API_PREFIX = '/api';

interface IFilterParams {
    title?: string;
    min_voltage?: string;
    max_voltage?: string;
}

// Получение списка с фильтрацией
export const getElectrolysisList = async (filters: IFilterParams): Promise<IPaginatedElectrolysis> => {
    const params = new URLSearchParams();
    
    if (filters.title) params.append('title', filters.title);
    if (filters.min_voltage) params.append('min_voltage', filters.min_voltage);
    if (filters.max_voltage) params.append('max_voltage', filters.max_voltage);

    const url = `${API_PREFIX}/electrolysis?${params.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Backend is not available');
        }
        const data = await response.json();
        return {
            items: data.items || [],
            total: data.total || 0
        };
    } catch (error) {
        console.warn('Failed to fetch from backend, using mock data.', error);
        
        // Логика фильтрации мока (если бэкенд недоступен)
        let filteredItems = ELECTROLYSIS_MOCK.items;

        if (filters.title) {
            filteredItems = filteredItems.filter(item => 
                item.title.toLowerCase().includes(filters.title!.toLowerCase())
            );
        }
        
        if (filters.min_voltage) {
            filteredItems = filteredItems.filter(item => 
                (item.base_voltage || 0) >= parseFloat(filters.min_voltage!)
            );
        }

        if (filters.max_voltage) {
            filteredItems = filteredItems.filter(item => 
                (item.base_voltage || 0) <= parseFloat(filters.max_voltage!)
            );
        }

        return { items: filteredItems, total: filteredItems.length };
    }
};

// Получение одного электролиза по ID
export const getElectrolysisById = async (id: string): Promise<IElectrolysis | null> => {
    try {
        const response = await fetch(`${API_PREFIX}/electrolysis/${id}`);
        if (!response.ok) {
            throw new Error('Backend is not available');
        }
        return await response.json();
    } catch (error) {
        console.warn(`Failed to fetch electrolysis ${id}, using mock data.`, error);
        const item = ELECTROLYSIS_MOCK.items.find(f => f.id === parseInt(id));
        return item || null;
    }
};
