import React, { useState } from "react";
import { CategoryEntity, IDType } from "@ecosystem-ar/sdk";
import { EmptyState, Toolbar } from "@components";
import { useCategories } from "@/shared/hooks/categories";
import { EmojiTags } from "@/shared/utils/emoji";
import { Button, Tabs } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CreateCategoryModal } from "@/components/modals/create-category/create-category.component";
import { Emoji } from "@/components/emojis/Emoji";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { ConfirmationModal } from "@/components/modals/confirmation-modal/confirmation-modal.component";
import { DraggableContainer } from "@/components/drag/categories/categories.component";
import styles from "./categories-tab.module.scss";
import { useSDK } from "@/shared/api";

export function CategoriesTabs({ store }: { store: string }) {
  const sdk = useSDK();
  const [createCategory, setCreateCategory] = useState(false);
  const [updateCategory, setUpdateCategory] = useState<any>();
  const [editDisable, setEditDisable] = useState(true);
  const { categories, loading_categories, refetch_categories } = useCategories(store as string);

  let orderedCategories: [] = [];

  const onDeleteCategory = (id: IDType) => {
    notifications.show(NOTIFICATIONS.CATEGORY_DELETE_PENDING);
    sdk.categories.delete(store, id)
      .then(() => {
        refetch_categories();
        notifications.update(NOTIFICATIONS.CATEGORY_DELETE_SUCCESS);
      })
      .catch(() => {
        notifications.update(NOTIFICATIONS.CATEGORY_DELETE_FAILED);
      });
  };

  const handlePostSortedCategories = (sortedCategories: any) => {
    notifications.show(NOTIFICATIONS.CATEGORY_SORTED_PENDING);

    if (sortedCategories.length) {
      sdk.categories.sort(store, sortedCategories)
        .then(() => {
          setEditDisable(!editDisable);
          notifications.update(NOTIFICATIONS.CATEGORY_SORTED_SUCCESS);
        })
        .catch(() =>
          notifications.update(NOTIFICATIONS.CATEGORY_SORTED_FAILED)
        );
    } else {
      notifications.update(NOTIFICATIONS.CATEGORY_SORTED_EMPTY);
    }
  };

  const deleteCategoryConfirmation = (category: CategoryEntity) => ConfirmationModal({
    title: "¿Estás seguro?",
    body: `Si eliminás la categoría "${category.name}", no se va a poder recuperar. Los productos dentro de esta categoría no serán eliminados.`,
    onConfirm: () => onDeleteCategory(category.id),
  })

  return (
    <Tabs.Panel value="categories" pb="xs" className={styles.tab_panel}>
      <Toolbar>
        <Button size="sm" onClick={() => setCreateCategory(true)}>
          Nueva Categoria
        </Button>
        <Button size="sm" onClick={() => setEditDisable(!editDisable)} disabled={!Boolean(categories?.length)}>
          {editDisable ? "Editar" : "Cancelar"}
        </Button>
        {!editDisable && (
          <Button
            onClick={() => {
              setEditDisable(true);
              handlePostSortedCategories(orderedCategories);
            }}
          >
            Listo!
          </Button>
        )}
      </Toolbar>

      {!loading_categories && categories && !categories.length && (
        <EmptyState
          title="No tenés Categorias."
          description="Creá tu primera categoria y empeza a vender!"
          icon={<Emoji tag={EmojiTags.FACE_WITH_MONOCLE} />}
        />
      )}

      {!loading_categories && categories && Boolean(categories?.length) && (
        <DraggableContainer
          categories={categories}
          store={store}
          orderedCategories={orderedCategories}
          editDisable={editDisable}
          setCategory={deleteCategoryConfirmation}
          setUpdateCategory={setUpdateCategory}
        />
      )}

      <CreateCategoryModal
        store={store}
        open={createCategory || updateCategory}
        category={updateCategory}
        onClose={() => {
          setCreateCategory(false);
          setUpdateCategory(false);
        }}
      />
    </Tabs.Panel>
  );
}
