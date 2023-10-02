import { useMemo, useState } from "react";
import { Autocomplete, Button, Card, Flex, Image, Menu, MultiSelect, SimpleGrid, Stack, Tabs, Text } from "@mantine/core";
import { IconDots, IconPower, IconSettings, IconTrash } from "@tabler/icons-react";

import { EmptyState, Toolbar } from "@components";
import { ProductModal } from "@/components/modals/product/product.component";
import { useCategories } from "@/shared/hooks/categories";
import { useProducts } from "@/shared/hooks/products/products";
import { GenerateAvatar } from "@/shared/utils/avatars";
import { GRID_BREAKPOINTS } from "@/shared/constants/grid-breakpoints";

import styles from './products-tab.module.scss';
import { ProductEntity } from "@ecosystem-ar/sdk";
import { notifications } from "@mantine/notifications";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { Emoji } from "@/components/emojis/Emoji";
import { EmojiTags } from "@/shared/utils/emoji";
import { PageUp, ConfirmationModal } from "@components";
import { useSDK } from "@/shared/api";

export function ProductsTabs({ store }: { store: string }) {
  const { categories, loading_categories } = useCategories(store);
  const { products, loading_products, refetch_products } = useProducts(store);
  const sdk = useSDK();
  
  const [categoryFilter, setCategoryFilter] = useState<any>([]);
  const [productNameFilter, setProductNameFilter] = useState<any>();
  const [createProduct, setCreateProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState<any>();

  const filterByCategory = (product: any) => {
    if (!categoryFilter.length) return product;
    return categoryFilter.includes(product.category?.id)
  }

  const filterByProductName = (product: any) => {
    if (!productNameFilter) return product;
    return product.name.toLowerCase() === productNameFilter.value.toLowerCase();
  }

  const deleteProduct = (id: string) => {
    notifications.show(NOTIFICATIONS.PRODUCT_DELETE_PENDING);
    sdk.products.delete(store, id)
      .then(() => {
        refetch_products();
        notifications.update(NOTIFICATIONS.PRODUCT_DELETE_SUCCESS);
      })
      .catch(() => {
        notifications.update(NOTIFICATIONS.PRODUCT_DELETE_FAILED);
      })
  }

  const deleteProductconfirmation = (product: ProductEntity) => ConfirmationModal({
    title: "¿Estás seguro?",
    body: `Si borrás el producto "${product.name}", no se va a poder recuperar.`,
    onConfirm: () => deleteProduct(product.id),
  })

  const MemoizedProductsFilteredByCategory = useMemo(() => (products || []).filter(filterByCategory), [products, categoryFilter, productNameFilter]);

  const MemoizedProducts = useMemo(() => MemoizedProductsFilteredByCategory.filter(filterByProductName).map((product) => (
      <Card key={product.id} withBorder style={{ overflow: 'unset' }}>
        <Flex gap={16} h="100%" wrap="nowrap">
          <Image w={50} h={50} radius={50} src={GenerateAvatar(product.images[0], product.name, product.images?.length)} alt={`${product.name} image`} />
          <Stack gap={2} justify="space-between" style={{ width : '100%', height: '100%' }}>
            <div>
              <Flex justify="space-between" align="start">
                <Text tt="capitalize" fz="sm" fw="bold">
                  {product.name}
                </Text>
                <Menu shadow="sm" position="bottom-end">
                  <Menu.Target>
                    <IconDots size={24} style={{ minWidth: 24 }} />
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item onClick={() => setUpdateProduct(product)} leftSection={<IconSettings size={14} />}>Editar</Menu.Item>
                    <Menu.Item disabled leftSection={<IconPower size={14} />}>Desactivar</Menu.Item>
                    <Menu.Item
                      color="red"
                      leftSection={<IconTrash size={14} />}
                      onClick={() => deleteProductconfirmation(product)}
                    >
                      Eliminar
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
              <Text fz="xs" c="dimmed">
                {Number(product.description?.length) > 50 ? `${product.description?.slice(0, 80)}...` : product.description}
              </Text>
            </div>
            <Flex justify="space-between" align="flex-end">
              <Text tt="uppercase" fz="xs" fw="bold" c="dimmed">
                {product.category?.name}
              </Text>
              <Text ta="right" fz="sm" fw="bold">
                {`$${Number(product.price.amount).toFixed(2)}`}
              </Text>
            </Flex>
          </Stack>
        </Flex>
      </Card>
    )), 
  [products, MemoizedProductsFilteredByCategory, productNameFilter]);


  return (
    <Tabs.Panel value="products" pb="xs" className={styles.tab_panel}>
      <Toolbar>
        <Autocomplete
          placeholder="Filtrar por nombre"
          data={MemoizedProductsFilteredByCategory.map((product) => ({ label: product.name, value: product.name }))}
          size="sm"
          style={{ flex: 1 }}
          maxDropdownHeight={150}
          // nothingFound="No se encontró el producto."
          // onItemSubmit={setProductNameFilter}
          onChange={(value) => {
            if (!value) setProductNameFilter(null);
          }}
        />
        <MultiSelect
          data={(categories || []).map(({ id, name }) => ({ value: id, label: name }))}
          searchable
          miw={250}
          // nothingFound="No se encontró la categoria."
          placeholder="Filtrar por Categoria"
          // clearable
          maxDropdownHeight={150}
          size="sm"
          value={categoryFilter}
          onChange={setCategoryFilter}
        />
        <Button size="sm" onClick={() => setCreateProduct(true)} disabled={loading_categories}>
          Nuevo Producto
        </Button>
      </Toolbar>

      {!loading_products && products && !products.length && (
        <EmptyState
          title="No tenés Productos."
          description="Creá tu primer producto y empezá a vender!"
          icon={<Emoji tag={EmojiTags.FACE_WITH_MONOCLE} />}
        />
      )}

      {!loading_products && products && Boolean(products.length) && (
        <SimpleGrid pt={16} cols={{base: 1, sm: 2,  md: 3}} spacing="sm">
          {MemoizedProducts}
        </SimpleGrid>
      )}

      <PageUp />

      <ProductModal
        store={store}
        open={createProduct || updateProduct}
        product={updateProduct}
        onClose={() => {
          setCreateProduct(false);
          setUpdateProduct(false);
        }}
      />
    </Tabs.Panel>
  )
}