import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";
import { ScrollArea, SimpleGrid, Tabs, useMantineTheme, } from "@mantine/core";
import { ProductEntity, IDType } from "@ecosystem-ar/sdk";

import { GRID_BREAKPOINTS } from "@/shared/constants/grid-breakpoints";
import { DEFAULT_CATEGORY } from "@/shared/utils";

import { ProductListProps } from "./product-list.types";
import { ProductListItem } from "./product-list-item.component";
import { BackgroundColor } from "@/shared/utils/theme/background.util";

export function ProductList({ products, categories, onSelect } : ProductListProps) {
  const router = useRouter();

  const theme = useMantineTheme();
  const [defaultTab, setDefaultTab] = useState("");

  const MemoizedGroupedProducts = useMemo(() => {
    return products.reduce((acc, curr) => {
      const current_category = curr?.category?.id || DEFAULT_CATEGORY.id;
      if (acc[current_category]) {
        return { ...acc, [current_category]: [...acc[current_category], curr] };
      } else {
        return { ...acc, [current_category]: [curr] }
      }
    }, {} as {[index: IDType]: ProductEntity[]})
  }, [products]);

  const MemoizedTabs = useMemo(() => [...categories, DEFAULT_CATEGORY].map(({ id, name }) => (
    <Tabs.Tab key={id} value={id} fw="regular">
      {name}
    </Tabs.Tab>
  )), [categories]);

  useEffect(() => {
    if (!defaultTab) {
      const default_tab = router.query.category as string || categories[0]?.id;
      setDefaultTab(default_tab);
    }
  }, [categories])

  const onTabChange = (value: any) => {
    const store_slug = `/${router.query.slug}`;
    const query_params = { category: value };
    
    router.push(
      { pathname: store_slug, query: query_params },
      undefined,
      { shallow: true }
    );
  }

  const backgroundColor = BackgroundColor(theme.other.color?.scheme);

  return defaultTab ? (
    <Tabs
      variant="pills"
      radius="xl"
      defaultValue={defaultTab}
      onChange={onTabChange}
    >
      <ScrollArea w="100%" type="never" style={{ position: "sticky", top: 0, zIndex: 1, backgroundColor }}>
        <Tabs.List py={16} px={16} style={{ flexWrap: 'nowrap' }}>
          {MemoizedTabs}
        </Tabs.List>
      </ScrollArea>
      {[...categories, DEFAULT_CATEGORY].map((category) => (
        <Tabs.Panel key={category.id} value={category.id}>
          <SimpleGrid p={16} spacing="md" verticalSpacing="lg" cols={GRID_BREAKPOINTS} mb={64}>
            {MemoizedGroupedProducts[category.id]?.map((product) => <ProductListItem key={product.id} product={product} onSelect={onSelect} />)}
          </SimpleGrid>
        </Tabs.Panel>
      ))}
    </Tabs>
  ) : null;
}

export default ProductList;