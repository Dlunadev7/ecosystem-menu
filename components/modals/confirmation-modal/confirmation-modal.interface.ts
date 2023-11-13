import { CategoryEntity, ProductEntity } from "@ecosystem-ar/sdk";

export interface ConfirmationModalProps {
  handleDelete: any,
  product?: ProductEntity,
  category?: CategoryEntity,
  open: boolean,
  onClose: () => void,
  id: string,
  store: string,
  loading: boolean,
}