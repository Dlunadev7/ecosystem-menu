import { IDType, ProductEntity } from "@ecosystem-ar/sdk";

export type SelectProduct = (product: ProductEntity) => void;

export type ProductListProps = {
  store: IDType;
  onSelect: SelectProduct
};

export type ProductGridItemProps = {
  product: ProductEntity;
  onSelect: SelectProduct
};