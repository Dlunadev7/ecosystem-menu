import { GRID_BREAKPOINTS } from "@/shared/constants/grid-breakpoints";
import { SimpleGrid } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { SortableContainer } from "react-sortable-hoc";
import { SortableCategoryCard } from "../card/card.component";
import { arrayMoveImmutable } from "array-move";
import { useDevice } from "@/shared/utils/hooks/device";
import { Category } from "../categories.interface";

export function DraggableContainer(props: any) {
  const [sortedCategories, setSortedCategories] = useState([]);
  const { isDesktop } = useDevice();
  const {
    categories,
    orderedCategories,
    editDisable,
    setCategory,
    setUpdateCategory,
    open,
  } = props;

  useEffect(() => {
    setSortedCategories(categories);
  }, [categories]);

  const CardContainer = SortableContainer(({ categories }: any) => {
    return (
      <ul style={{ padding: 0, margin: 0 }}>
        <SimpleGrid cols={GRID_BREAKPOINTS}>
          {categories?.map((category: Category, index: number) => (
            <SortableCategoryCard
              key={`item-${category.id}`}
              index={index}
              // @ts-ignore
              category={category}
              editDisable={editDisable}
              setCategory={setCategory}
              setUpdateCategory={setUpdateCategory}
            />
          ))}
        </SimpleGrid>
      </ul>
    );
  });

  const ContainerCategories = () => {
    return (
      <CardContainer
        axis="xy"
        // @ts-ignore
        categories={sortedCategories}
        useWindowAsScrollContainer={!isDesktop}
        onSortEnd={({ oldIndex, newIndex }) => {
          const newSortedCategories = arrayMoveImmutable(
            sortedCategories,
            oldIndex,
            newIndex
          );
          
          newSortedCategories.forEach(
            (movedProduct: { id: string }, newIndex: number) => {
              const movedProductId = movedProduct.id;
              const newPosition = newIndex;

              const isElementAlreadyAdded = orderedCategories?.some(
                (item: any) => item.id === movedProductId
              );

              if (!isElementAlreadyAdded) {
                orderedCategories?.push({
                  id: movedProductId,
                  order: newPosition,
                });
              }
            }
          );
          setSortedCategories(newSortedCategories);
        }}
        useDragHandle
      />
    );
  };

  return <ContainerCategories />;
}
