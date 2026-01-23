export interface IMedia {
    id: number;
    url: string;
    type: 'image' | 'video';
}

export interface IElectrolysis {
    id: number;
    title: string;
    text: string;
    image_url?: string;
    base_time?: number;
    base_voltage?: number;
    material_coefficient?: number;
    status?: boolean | number; // Updated to support both boolean and number (from order status)
    
    // Fields for polling (keep them!)
    calculated_value?: number;
    
    // New field for media (add this!)
    media_files?: IMedia[];
}

export interface IPaginatedElectrolysis {
    items: IElectrolysis[];
    total: number; // Optional based on backend response, usually useful
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
