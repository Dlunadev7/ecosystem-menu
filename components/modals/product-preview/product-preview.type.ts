import { CartItem } from "@/shared/types";
import { ProductEntity } from "@ecosystem-ar/sdk";



export type ProductPreviewProps = {
  product: ProductEntity | null;
  onRequestClose: () => void;
  onAddItemToCart: (product: CartItem) => void;
  hasPhone: boolean
}
