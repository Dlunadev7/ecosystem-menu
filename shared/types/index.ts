import { ProductEntity } from "@ecosystem-ar/sdk";

export type Cart = {
  total: number;
  products: CartItem[];
  total_products: number;
  note?: string;
};

export type CartItem = {
  quantity: number;
  product: ProductEntity;
}