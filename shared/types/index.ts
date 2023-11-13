import { ProductEntity } from "@ecosystem-ar/sdk";

export type Cart = {
  store: {
    id: string;
    name: string;
    slug: string;
    phone: string | undefined;
  },
  total: number;
  products: CartItem[];
  total_products: number;
  note?: string;
};

export type CartItem = {
  quantity: number;
  product: ProductEntity;
}