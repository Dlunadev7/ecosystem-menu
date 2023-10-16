import { ProductEntity } from "@ecosystem-ar/sdk";

export type SelectProduct = (product: ProductEntity) => void;

export type ProductGridItemProps = {
  product: ProductEntity;
  onSelect: SelectProduct
};