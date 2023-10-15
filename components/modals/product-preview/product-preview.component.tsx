import { useEffect, useState } from "react";

import Image from "next/image";
import { AspectRatio, Modal, Space, Stack, Text, Title, rem } from "@mantine/core";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";

import { ProductPreviewProps } from "./product-preview.type";

const TRANSITION_DURATION = 200;
function ProductPreview({ product, onRequestClose }: ProductPreviewProps) {
  const [active, setActive] = useState(false);
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  useEffect(() => {
    if (product) setActive(true);
  }, [product]);

  if (!product) return null;

  const has_images = Boolean(product.images.length);
  const price = Number(product.price?.amount).toFixed(2);

  return (
    <Modal.Root
      padding={0}
      transitionProps={{ onExited: onRequestClose, duration: TRANSITION_DURATION }}
      opened={active}
      onClose={() => setActive(false)}
      trapFocus={false}
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
              styles={{
                indicator: {
                  width: rem(12),
                  height: rem(4),
                  transition: 'width 250ms ease',
                  /**
                   * @todo find a way to make this work
                   */
                  // '&[data-active]': {
                  //   width: rem(40),
                  // },
                },
              }}
            >
              {product.images.map(({ id, uri }, index) => (
                <Carousel.Slide key={id}>
                  <AspectRatio ratio={1/1}>
                    <Image src={uri} alt={`${product.name} image ${index}`} priority fill sizes="500px" placeholder="empty" />
                  </AspectRatio>
                </Carousel.Slide>
              ))}
            </Carousel>
          )}
          <Stack align="normal" p={8} gap={2}>
            <Text fw="bold" tt="uppercase" c="dimmed" size="xs">
              {product.category?.name}
            </Text>
            <Title order={3} fw="bold" tt="capitalize" size="md">
              {product.name}
            </Title>
            <Text size="sm" c="dimmed">
              {product.description}
            </Text>
            <Space h={8} />
            <Text size="sm" fw="bold" ta="end">
              {`$${price}`}
            </Text>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
};

export default ProductPreview;