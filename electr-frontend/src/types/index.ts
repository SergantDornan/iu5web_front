export interface IMedia {
    id: number;
    url: string;
    type: 'image' | 'video';
}

export interface IElectrolysis {
    id: number;
    title: string;
    text: string;
    image_url?: string;           // В твоем DTO это поле json:"image_url"
    base_time?: number;           // json:"base_time"
    base_voltage?: number;        // json:"base_voltage"
    material_coefficient?: number;// json:"material_coefficient"
    status?: boolean;             // json:"status"

    media_files?: IMedia[];
}

export interface IPaginatedElectrolysis {
    items: IElectrolysis[];
    total: number;
}

export interface ICrumb {
    label: string;
    path?: string;
    active?: boolean;
}

export interface ICartBadge {
    order_id: number | null;
    count: number;
}
