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

export interface SiteSettings {
  facebookPixelId: string;
  googleSheetUrl: string;
  eventBannerText: string;
  isBannerActive: boolean;
}

export type OrderStatus = 'idle' | 'submitting' | 'success' | 'error';

export type OrderStatusType = 'new' | 'confirmed' | 'shipped' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  city: string;
  phone: string;
  productName: string;
  price: number;
  status: OrderStatusType;
  date: string;
}