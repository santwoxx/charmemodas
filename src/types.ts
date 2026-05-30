/**
 * Types and interfaces for the Charme Modas e-commerce application.
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  category: string;
  images: string[]; // List of image URLs
  sizes: string[]; // e.g. ["P", "M", "G", "GG"]
  colors: { name: string; hex: string }[];
  fabric: string; // e.g. "Linho", "Seda", "Cetim", "Crepe"
  rating: number;
  reviewsCount: number;
  isDailyDeal?: boolean;
  stockCount: number;
  details: string[]; // Key aspects of the garment
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  isPinned?: boolean;
  linkedProductIds: string[]; // IDs of products featured in this photo
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  sizeBought: string;
  colorBought: string;
  avatarUrl?: string;
}

export interface StoreHighlight {
  id: string;
  title: string;
  iconName: string; // "heart", "feedback", "hanger", "info"
  description: string;
}
