import type { IElectrolysis, IPaginatedElectrolysis } from '../types';

// Интерфейс параметров фильтрации (он только тут нужен, можно оставить)
export interface ElectrolysisListParams {
    title?: string;
    min_voltage?: string;
    max_voltage?: string;
}

const BASE_URL = 'http://192.168.1.148:8080/api'; 
// ---------------------------

export const getElectrolysisList = async (params?: ElectrolysisListParams): Promise<IPaginatedElectrolysis> => {
    const query = new URLSearchParams();
    
    if (params?.title) query.append('title', params.title);
    if (params?.min_voltage) query.append('min_voltage', params.min_voltage);
    if (params?.max_voltage) query.append('max_voltage', params.max_voltage);

    const res = await fetch(`${BASE_URL}/electrolysis?${query.toString()}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch electrolysis list: ${res.statusText}`);
    }
    return res.json();
};

export const getElectrolysisById = async (id: string): Promise<IElectrolysis> => {
    const res = await fetch(`${BASE_URL}/electrolysis/${id}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch electrolysis with id ${id}`);
    }
    return res.json();
};
