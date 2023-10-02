import Image from "next/image";
import { Flex, Stack, Title, Text } from "@mantine/core";

import { Card } from "@components";
import { ProductGridItemProps } from "./product-list.types";

export function ProductListItem({ product, onSelect }: ProductGridItemProps) {
  const { images, description, name, price } = product;
  
  const has_images = Boolean(images.length);
  const fixed_price = Number(price.amount).toFixed(2);  
  const profile_photo = has_images ? images[0].uri : "";

  return (
    <Card onClick={() => onSelect(product)}>
      <Flex gap="sm">
        {has_images && (
          <Image src={profile_photo} alt={`${name} photo`} width={90} height={90} style={{ borderRadius: '100%' }} priority />
        )}
        <Stack gap={0} justify="space-between" style={{ flex: 1 }}>
          <Stack gap={4}>
            <Title order={2} fz="sm" tt="capitalize">{name}</Title>
            <Text fz="xs" lineClamp={2}>
              {description}
            </Text>
          </Stack>
          <Text ta="end" fz="xs">{`$${fixed_price}`}</Text>
        </Stack>
      </Flex>
    </Card>
  )
}