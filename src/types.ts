export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  original_price: number;
  discount_percent: number;
  image_url: string;
  affiliate_link: string;
  store_name: string;
  category: string;
  is_active: boolean;
  clicks: number;
  created_at: number;
}
