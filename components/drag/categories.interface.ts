import { CategoryEntity } from "@ecosystem-ar/sdk";

export interface Category {
  id: string;
  name: string;
  store: string;
  description: string;
  created_at: string;
}

export type SortableCategoryProps = {
  index: number;
  category: Category;
  editDisable: boolean;
  categories?: Partial<CategoryEntity>[];
  orderedCategories?: {
    id: string;
    order: number;
  }[];
  setUpdateCategory: ({}) => any;
  setCategory: ({}) => any;
  store?: string;
};

export interface CardContainerProps {
  categories: Category[];
}
