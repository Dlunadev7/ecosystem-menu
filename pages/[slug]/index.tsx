import { useEffect, useMemo, useState } from "react";

import { Container, Paper, Skeleton, Stack, Text, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";

import { useStore } from "@/shared/hooks/stores/store";
import { RandomAvatar } from "@/shared/utils/avatars";
import { Head, PageUp, Splash, ProductList } from "@components";
import { ProductEntity } from "@ecosystem-ar/sdk";
import { useTheme } from "@/context/theme/theme.context";

const ProductPreview = dynamic(() => import('@/components/modals/product-preview/product-preview.component'));

export default function StoreScreen() {
  const { query } = useRouter();
  const { setColorScheme } = useMantineColorScheme();

  // Revisa que el theme en cuestion no se actualice infinitamente (loop de renders)
  const [themeUpdated, setThemeUpdated] = useState(false);

  const { updateThemePreferences } = useTheme();

  const theme = useMantineTheme();
  const { store, loading_store } = useStore(query.slug as string);

  const [productPreview, setProductPreview] = useState<ProductEntity | null>(null);

  const onPreviewOpen = (product: ProductEntity) => {
    setProductPreview(product);
  };

  const onPreviewClose = () => {
    setProductPreview(null);
  };

  const MemoizedProducts = useMemo(() => {
    return store ? (<ProductList store={store.id} onSelect={onPreviewOpen} />) : null;
  }, [store]);

  useEffect(() => {
    if (!themeUpdated && store && store.theme) {
      const { color } = store.theme;
      setThemeUpdated(true);
      updateThemePreferences({
        other: {
          ...store.theme,
        },
        primaryColor: color.primary,
      });
      setColorScheme(color.scheme);
    }
  }, [store])

  if (!loading_store && !store) {
    return <Splash notfound={!store} />;
  }

  return (
    <Container px={0} maw={980} style={{ margin: 'auto' }}>
      <Head title={`${store?.name || "Menú"}`} description={`${store?.description || 'Menu'}`} />
      <Stack align="center" mb={64}>
        <Paper shadow="md" radius={8} mt={64} style={{ overflow: 'hidden' }}>
          <Skeleton width={100} height={100} visible={loading_store || !store} animate>
            <Image
              width={100}
              height={100}
              src={store?.avatar?.uri || RandomAvatar("randm")}
              alt={`${store?.name} avatar`}
              priority
            />
          </Skeleton>
        </Paper>
        <Title ta="center" order={1} tt="capitalize">
          {store?.name}
        </Title>
        {store?.address && (
          <Text fz="xs" ta="center" tt="capitalize">
            {`${store.address.street_name} ${store.address.street_number} | ${store.address.city}`}
          </Text>
        )}
        {store?.description && (
          <Text px={8} fz="xs" ta="center">
            {store.description}
          </Text>
        )}
      </Stack>

      {MemoizedProducts}
      <ProductPreview product={productPreview} onRequestClose={onPreviewClose} />
      <PageUp />
    </Container>
  )
}