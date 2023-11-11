import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import {
  ActionIcon,
  Container,
  Flex,
  MantineProvider,
  MantineStyleProp,
  MantineTheme,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
  createTheme
} from "@mantine/core";
import { CategoryEntity, EcosystemStoreSDK, IDType, ProductEntity, StoreEntity } from "@ecosystem-ar/sdk";

import { CartButton, Footer, Head, PageUp, ProductListItem } from "@components";
import { RandomAvatar } from "@/shared/utils/avatars";
import { DEFAULT_CATEGORY } from "@/shared/utils";
import { GRID_BREAKPOINTS } from "@/shared/constants/grid-breakpoints";
import { BackgroundColor } from "@/shared/utils/theme/background.util";
import { SocialNetworkIcon } from "@/shared/utils/social-networks";
import { Cart, CartItem } from "@/shared/types";
import { OrderPreview } from "@/components/modals/order-peview/order-preview.component";

const ProductPreview = dynamic(() => import('@/components/modals/product-preview/product-preview.component'));

type StoreSpotlightProps = {
  store: StoreEntity;
  products: ProductEntity[];
  categories: CategoryEntity[];
  theme: MantineTheme;
}

export default function StoreScreen({ store, products, categories, theme }: StoreSpotlightProps) {
  const router = useRouter();

  const [productPreview, setProductPreview] = useState<ProductEntity | null>(null);
  const [defaultTab, setDefaultTab] = useState("");
  const [showOrder, setShowOrder] = useState(false);
  const [cart, setCart] = useState<Cart>({
    store: {
      name: store.name,
      id: store.id,
      slug: store.slug,
      phone: store.phone,
    },
    total: 0,
    products: [],
    total_products: 0
  });

  const MemoizedTabs = useMemo(() => [...categories, DEFAULT_CATEGORY].map(({ id, name }) => (
    <Tabs.Tab key={id} value={id} tt="capitalize" fw="regular">
      {name}
    </Tabs.Tab>
  )), [categories]);

  useEffect(() => {
    if (!defaultTab) {
      const default_tab = router.query.category as string || categories[0]?.id;
      setDefaultTab(default_tab);
    }
  }, [categories])

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

  const onTabChange = (value: any) => {
    const store_slug = `/${router.query.slug}`;
    const query_params = { category: value };
    
    router.push(
      { pathname: store_slug, query: query_params },
      undefined,
      { shallow: true }
    );
  }

  const onPreviewOpen = (product: ProductEntity) => {
    setProductPreview(product);
  };

  const onPreviewClose = () => {
    setProductPreview(null);
  };

  const onCartRecalculate = (products: CartItem[]) => {
    const totals = products.reduce((acc, curr) => {
      return {
        total: acc.total + Number(curr.product.price.amount) * curr.quantity,
        total_products: acc.total_products + curr.quantity
      }
    }, { total: 0, total_products: 0 });
    
    const updated_cart = {
      ...cart,
      total: totals.total,
      products: products,
      total_products: totals.total_products
    }

    setCart(updated_cart);
  }

  const onAddToCart = (item: CartItem) => {
    const already_in_cart = cart.products.some(product => product.product.id === item.product.id);

    if (!already_in_cart) return onCartRecalculate([ ...cart.products, item ]);

    const updated_cart = cart.products.map(cart_item => {
      const { id: cart_product } = cart_item.product;
      const { id: current_product } = item.product;

      const same_product = cart_product === current_product;

      return same_product ? { ...cart_item, quantity: cart_item.quantity + item.quantity } : cart_item;
    })

    onCartRecalculate(updated_cart);
  }

  const onUpdateQuantity = (item: CartItem, quantity: number) => {
    const updated_products = cart.products.map(product => {
      if (product.product.id === item.product.id) {
        return { ...product, quantity }
      }
      return product;
    });

    onCartRecalculate(updated_products);
  }

  const listStyle: MantineStyleProp = {
    position: "sticky", 
    top: 0,
    zIndex: 1,
    backgroundColor: BackgroundColor(store.theme?.color.scheme),
  }

  return (
    <MantineProvider classNamesPrefix="ecosystem" theme={theme} forceColorScheme={store.theme?.color.scheme}>
      <Container px={0} maw={980} style={{ margin: 'auto' }}>
        <Head title={store.name} description={store.description} slug={store.slug} />
        <Stack align="center" mb={64}>
          <Paper h={120} shadow="md" radius={8} mt={64} style={{ overflow: 'hidden' }}>
            <Image
              width={120}
              height={120}
              src={store.avatar?.uri || RandomAvatar("randm")}
              alt={`${store.name} avatar`}
              priority
            />
          </Paper>
          <Title ta="center" order={1}>
            {store.name}
          </Title>
          <Flex gap="xs" justify="center" align="flex-start" direction="row" wrap="wrap" px={8} w={200}>
            {(store.social_networks || []).map(({ name, id, url }) => (
              <ActionIcon component="a" href={url} radius="xl" key={id} target="_blank">
                {SocialNetworkIcon(name, 18)}
              </ActionIcon>
            ))}
          </Flex>
          {store.address && (
            <Text fz="xs" ta="center" tt="capitalize">
              {`${store.address.street_name} ${store.address.street_number} | ${store.address.city}`}
            </Text>
          )}
          {store.description && (
            <Text px={16} fz="xs" ta="center" maw={450}>
              {store.description}
            </Text>
          )}
        </Stack>

          {defaultTab && (
            <Tabs variant="pills" radius="xl" defaultValue={defaultTab} onChange={onTabChange}>
              <ScrollArea w="100%" type="never" style={listStyle}>
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

        <ProductPreview
          onAddItemToCart={onAddToCart}
          product={productPreview}
          onRequestClose={onPreviewClose}
          hasPhone={Boolean(store.phone)}
        />
        <OrderPreview
          onRequestClose={() => setShowOrder(false)}
          opened={showOrder} order={cart}
          onUpdateProductQuantity={onUpdateQuantity}
        />

        <PageUp right={100} />
        <CartButton onClick={() => setShowOrder(true)} items={store.phone ? cart?.total_products : 0} />
        
      </Container>
      <Footer />
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

  const theme = createTheme(store.theme ? {
    primaryColor: 'brand',
    colors: {
      brand: store.theme.color.brand,
    },
    shadows: {
      xs: `0 calc(0.0625rem*var(--mantine-scale)) calc(0.1875rem*var(--mantine-scale)) ${store.theme.shadow.color}0D,
          0 calc(0.0625rem*var(--mantine-scale)) calc(0.125rem*var(--mantine-scale)) ${store.theme.shadow.color}1A`,
      sm: `0 calc(0.0625rem*var(--mantine-scale)) calc(0.1875rem*var(--mantine-scale)) ${store.theme.shadow.color}0D,
          ${store.theme.shadow.color}0D 0 calc(0.625rem*var(--mantine-scale)) calc(0.9375rem*var(--mantine-scale)) calc(-0.3125rem*var(--mantine-scale)),
          ${store.theme.shadow.color}0A 0 calc(0.4375rem*var(--mantine-scale)) calc(0.4375rem*var(--mantine-scale)) calc(-0.3125rem*var(--mantine-scale))`,
      md: `0 calc(0.0625rem*var(--mantine-scale)) calc(0.1875rem*var(--mantine-scale)) ${store.theme.shadow.color}0D,
          ${store.theme.shadow.color}0D 0 calc(1.25rem*var(--mantine-scale)) calc(1.5625rem*var(--mantine-scale)) calc(-0.3125rem*var(--mantine-scale)),
          ${store.theme.shadow.color}0A 0 calc(0.625rem*var(--mantine-scale)) calc(0.625rem*var(--mantine-scale)) calc(-0.3125rem*var(--mantine-scale))`,
      lg: `0 calc(0.0625rem*var(--mantine-scale)) calc(0.1875rem*var(--mantine-scale)) ${store.theme.shadow.color}0D,
          ${store.theme.shadow.color}0D 0 calc(1.75rem*var(--mantine-scale)) calc(1.4375rem*var(--mantine-scale)) calc(-0.4375rem*var(--mantine-scale)),
          ${store.theme.shadow.color}0A 0 calc(0.75rem*var(--mantine-scale)) calc(0.75rem*var(--mantine-scale)) calc(-0.4375rem*var(--mantine-scale))`,
      xl: `0 calc(0.0625rem*var(--mantine-scale)) calc(0.1875rem*var(--mantine-scale)) ${store.theme.shadow.color}0D,
          ${store.theme.shadow.color}0D 0 calc(2.25rem*var(--mantine-scale)) calc(1.75rem*var(--mantine-scale)) calc(-0.4375rem*var(--mantine-scale)),
          ${store.theme.shadow.color}0A 0 calc(1.0625rem*var(--mantine-scale)) calc(1.0625rem*var(--mantine-scale)) calc(-0.4375rem*var(--mantine-scale))`,
    }    
  } as any : {});

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