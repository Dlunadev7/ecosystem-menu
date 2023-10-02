import { ProductEntity } from "@ecosystem-ar/sdk";

export type ProductPreviewProps = {
  product: ProductEntity | null;
  onRequestClose: () => void;
}
