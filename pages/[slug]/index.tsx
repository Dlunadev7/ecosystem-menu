import { useEffect, useMemo, useState } from "react";

import { Container, MantineProvider, Paper, ScrollArea, SimpleGrid, Stack, Tabs, Text, Title, createTheme } from "@mantine/core";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CategoryEntity, EcosystemStoreSDK, IDType, ProductEntity, StoreEntity } from "@ecosystem-ar/sdk";

import { RandomAvatar } from "@/shared/utils/avatars";
import { Head, PageUp } from "@components";
import { useRouter } from "next/router";
import { DEFAULT_CATEGORY } from "@/shared/utils";
import { ProductListItem } from "@/components/product-list/product-list-item.component";
import { GRID_BREAKPOINTS } from "@/shared/constants/grid-breakpoints";
import { BackgroundColor } from "@/shared/utils/theme/background.util";
import { StoreTheme } from "@ecosystem-ar/sdk/build/shared";

const ProductPreview = dynamic(() => import('@/components/modals/product-preview/product-preview.component'));

type StoreSpotlightProps = {
  store: StoreEntity;
  products: ProductEntity[];
  categories: CategoryEntity[];
  theme?: StoreTheme;
}

export default function StoreScreen({ store, products, categories, theme }: StoreSpotlightProps) {
  const [productPreview, setProductPreview] = useState<ProductEntity | null>(null);

  const router = useRouter();

  const [defaultTab, setDefaultTab] = useState("");

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

  const onPreviewOpen = (product: ProductEntity) => {
    setProductPreview(product);
  };

  const onPreviewClose = () => {
    setProductPreview(null);
  };

  return (
    <MantineProvider {...(theme && theme)} forceColorScheme={store.theme?.color.scheme}>
      <Container px={0} maw={980} style={{ margin: 'auto' }}>
        <Head title={store.name} description={store.description} slug={store.slug} />
        <Stack align="center" mb={64}>
          <Paper shadow="md" radius={8} mt={64} style={{ overflow: 'hidden' }}>
            <Image
              width={100}
              height={100}
              src={store.avatar?.uri || RandomAvatar("randm")}
              alt={`${store.name} avatar`}
              priority
            />
          </Paper>
          <Title ta="center" order={1} tt="capitalize">
            {store.name}
          </Title>
          {store.address && (
            <Text fz="xs" ta="center" tt="capitalize">
              {`${store.address.street_name} ${store.address.street_number} | ${store.address.city}`}
            </Text>
          )}
          {store.description && (
            <Text px={8} fz="xs" ta="center">
              {store.description}
            </Text>
          )}
        </Stack>

        {defaultTab && (
          <Tabs variant="pills" radius="xl" defaultValue={defaultTab} onChange={onTabChange}>
            <ScrollArea w="100%" type="never" style={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: BackgroundColor(store.theme?.color.scheme) }}>
              <Tabs.List py={16} px={16} style={{ flexWrap: 'nowrap' }}>
                {MemoizedTabs}
              </Tabs.List>
            </ScrollArea>
            {[...categories, DEFAULT_CATEGORY].map((category) => (
              <Tabs.Panel key={category.id} value={category.id}>
                <SimpleGrid p={16} spacing="md" verticalSpacing="lg" cols={GRID_BREAKPOINTS} mb={64}>
                  {MemoizedGroupedProducts[category.id]?.map((product) => <ProductListItem key={product.id} product={product} onSelect={onPreviewOpen} />)}
                </SimpleGrid>
              </Tabs.Panel>
            ))}
          </Tabs>
        )}

        <ProductPreview product={productPreview} onRequestClose={onPreviewClose} />
        <PageUp />
      </Container>
    </MantineProvider>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const SSG_SDK = EcosystemStoreSDK({ base_uri: process.env.NEXT_PUBLIC_API_URI });

  const store = await SSG_SDK.stores.findBySlug(slug);
 
  const [ products, categories ] = await Promise.all([
    SSG_SDK.products.findByStoreID(store.id),
    SSG_SDK.categories.findByStoreID(store.id)
  ]);

  const theme = store.theme ? createTheme({
    primaryColor: store.theme.color.primary,
  }) : null;

  return {
    props: { store, products, categories, theme },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const SSG_SDK = EcosystemStoreSDK({ base_uri: process.env.NEXT_PUBLIC_API_URI });

  const stores = await SSG_SDK.stores.findAll();
 
  const paths = stores.map((store: Partial<StoreEntity>) => ({
    params: { slug: store.slug },
  }))
 
  return { paths, fallback: 'blocking' }
}