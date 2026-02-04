export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  features: string[];
}

export interface OrderFormData {
  fullName: string;
  city: string;
  phone: string;
}

export type OrderStatus = 'idle' | 'submitting' | 'success' | 'error';