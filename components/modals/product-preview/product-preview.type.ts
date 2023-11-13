import { CartItem } from "@/shared/types";
import { ProductEntity, StoreEntity } from "@ecosystem-ar/sdk";



export type ProductPreviewProps = {
  product: ProductEntity | null;
  store: StoreEntity | null;
  onRequestClose: () => void;
  onAddItemToCart: (product: CartItem) => void;
  hasPhone: boolean
}
