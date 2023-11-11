import { useEffect, useState } from "react";

import NextImage from "next/image";
import { AspectRatio, Button, Flex, Modal, Space, Stack, Text, Title, Image } from "@mantine/core";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";

import { ProductPreviewProps } from "./product-preview.type";
import product_preview from './product-preview.module.scss'
import { notifications } from "@mantine/notifications";
import { Counter } from "@/components/counter/counter.component";


const TRANSITION_DURATION = 200;
function ProductPreview({ product, onRequestClose, onAddItemToCart, hasPhone }: ProductPreviewProps) {
  const [active, setActive] = useState(false);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [count, setCount] = useState(1);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  useEffect(() => {
    if (product) setActive(true);
  }, [product]);

  if (!product) return null;

  const onClose = () => {
    setActive(false);
    setCount(1);
    onRequestClose();
  }

  const onAddToCart = () => {
    onAddItemToCart({ product, quantity: count });
    
    notifications.show({
      title: "Añadido al carrito",
      message: `Se añadio ${product.name} x ${count}u a la orden.`,
      icon: <Image priority component={NextImage} src={product.images[0]?.uri} alt={product.name} width={50} height={50} radius="lg" />,
      withCloseButton: false,
      top: 60,
      styles: {
        icon: {
          width: 50,
          height: 50,
          borderRadius: "md"
        }
      }
    })
    
    onClose();
  }

  const has_images = Boolean(product.images.length);
  const price = Number(product.price?.amount).toFixed(2);

  return (
    <Modal.Root
      padding={0}
      transitionProps={{ onExited: onClose, duration: TRANSITION_DURATION }}
      opened={active}
      onClose={() => setActive(false)}
      trapFocus={false}
      zIndex={500}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Body>
          {has_images && (
            <Carousel
              getEmblaApi={setEmbla}
              align="start"
              withIndicators
              withControls={false}
              classNames={product_preview}
            >
              {product.images.map(({ id, uri }, index) => (
                <Carousel.Slide key={id}>
                  <AspectRatio ratio={1/1}>
                    <NextImage src={uri} alt={`${product.name} image ${index}`} priority fill sizes="500px" placeholder="empty" />
                  </AspectRatio>
                </Carousel.Slide>
              ))}
            </Carousel>
          )}
          <Stack align="normal" p={16} gap={2}>
            <Text fw="bold" tt="uppercase" c="dimmed" size="xs">
              {product.category?.name}
            </Text>
            <Title order={3} fw="bold" tt="capitalize" size="md">
              {product.name}
            </Title>
            <Text size="sm" c="dimmed">
              {product.description}
            </Text>
            <Space h={16} />
            {hasPhone && (
              <Flex columnGap={8}>
                <Counter value={count} onChange={setCount} />
                <Button onClick={onAddToCart} fullWidth>
                  <Text size="sm">{`Añadir ($${(Number(price) * count).toFixed(2)})`}</Text>
                </Button>
              </Flex>
            )}
            {!hasPhone && (
              <Text size="sm" ta="end">{`$${(Number(price) * count).toFixed(2)}`}</Text>            
            )}
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
};

export default ProductPreview;