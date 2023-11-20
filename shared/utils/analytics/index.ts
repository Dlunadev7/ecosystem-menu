import { CategoryEntity, ProductEntity, SocialNetworks, StoreEntity } from "@ecosystem-ar/sdk";

const checkAnalytics = () => {
  if (typeof window !== 'undefined') {
    return (window as any).umami;
  }
}

const onProductClicked = (website_id: string, product: ProductEntity) => {
  const client = checkAnalytics();
  if (!client) return;

  client.track(`product.clicked`, {
    website: website_id,
    product_name: product.name,
    product_id: product.id
  });
}

const onCategoryClicked = (website_id: string, category: CategoryEntity) => {
  const client = checkAnalytics();
  if (!client) return;

  client.track(`category.clicked`, {
    website: website_id,
    category_name: category.name,
    category_id: category.id
  });
}

const onPageViewed = (website_id: string) => {
  const client = checkAnalytics();
  if (!client) return;

  client.track({ website: website_id });
}

const onSocialNetworkClicked = (website_id: string, social_network: SocialNetworks) => {
  const client = checkAnalytics();
  if (!client) return;

  client.track(`social_network.clicked`, { website: website_id });
}

const onProductCarouselUsed = (website_id: string, product: ProductEntity) => {
  const client = checkAnalytics();
  if (!client) return;

  client.track(`product.carousel`, {
    website: website_id,
    name: product.name,
    id: product.id
  });
}

const onStoreBannerUsed = (website_id: string, store: StoreEntity) => {
  const client = checkAnalytics();
  if (!client) return;

  client.track(`store.banner`, {
    website: website_id,
  });
}

export const Analytics = {
  onProductClicked,
  onCategoryClicked,
  onPageViewed,
  onSocialNetworkClicked,
  onProductCarouselUsed,
  onStoreBannerUsed
}