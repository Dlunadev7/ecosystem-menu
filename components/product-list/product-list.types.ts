import { CategoryEntity, IDType, ProductEntity } from "@ecosystem-ar/sdk";

export type SelectProduct = (product: ProductEntity) => void;

export type ProductListProps = {
  products: ProductEntity[];
  categories: CategoryEntity[];
  onSelect: SelectProduct;
};

export type ProductGridItemProps = {
  product: ProductEntity;
  onSelect: SelectProduct
};