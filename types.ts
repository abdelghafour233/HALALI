export type CategoryId = 'all' | 'watches' | 'glasses' | 'car' | 'misc';

export interface Category {
  id: CategoryId;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  features: string[];
  category: CategoryId;
}

export interface OrderFormData {
  fullName: string;
  city: string;
  phone: string;
}

export type OrderStatus = 'idle' | 'submitting' | 'success' | 'error';