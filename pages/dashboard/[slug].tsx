import { useRouter } from "next/router";

import { Container, ScrollArea, Tabs, useMantineTheme } from "@mantine/core";
import { useAuth } from "@/context/auth/auth.context";
import { useStore } from "@/shared/hooks/stores/store";

import { Head, Header, Splash } from "@components";
import { ProductsTabs } from "@/components/tabs/store/products/products-tab.component";
import { CategoriesTabs } from "@/components/tabs/store/categories/categories-tab.component";
import { SubscriptionTabs } from "@/components/tabs/store/subscription/subscription.component";
import { SettingsTab } from "@/components/tabs/store/settings/settings-tab.component";
import { UsersTab } from "@/components/tabs/store/users/user-tab.component";

import styles from "../../styles/global.module.scss";

export default function DashboardStoreScreen() {
  const router = useRouter();

  const { logged } = useAuth();
  const { store, loading_store } = useStore(router.query.slug as string);
  
  if (loading_store || !logged || !store) {
    return (
      <Splash loading={loading_store} notfound={!store} unauthorized={!logged} />
    );
  }


  return (
    <Container fluid className={styles.container}>
      <Head title={`${store.name}`} />
      <Header allowBack />
      <Tabs defaultValue="products" mt={50}>
        <ScrollArea w="100%" type="never" className={styles.tabs}>
          <Tabs.List h={50} style={{ flexWrap: 'nowrap' }}>
            <Tabs.Tab value="products">Productos</Tabs.Tab>
            <Tabs.Tab value="categories">Categorias</Tabs.Tab>
            <Tabs.Tab value="users">Usuarios</Tabs.Tab>
            <Tabs.Tab value="subscriptions" disabled={!store.subscription}>Suscripciones</Tabs.Tab>
            <Tabs.Tab value="settings">Configuración</Tabs.Tab>
          </Tabs.List>
        </ScrollArea>

        <ProductsTabs store={store.id} />
        <CategoriesTabs store={store.id} />
        <SubscriptionTabs store={store} />
        <UsersTab store={store} />
        <SettingsTab />
      </Tabs>
    </Container>
  );
}
