import { Counter } from '@/components';
import { Cart, CartItem } from '@/shared/types';
import { GenerateAvatar } from '@/shared/utils/avatars';
import { useDevice } from '@/shared/utils/hooks/device';
import { Button, Flex, Modal, Paper, Space, Stack, Stepper, Text, Textarea, Title } from '@mantine/core';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

type OrderPreviewProps = {
  opened: boolean;
  onRequestClose: () => void;
  order: Cart;
  onUpdateProductQuantity: (product: CartItem, quantity: number) => void
}

export const OrderPreview = ({ opened, onRequestClose, order, onUpdateProductQuantity }: OrderPreviewProps) => {
  const [active, setActive] = useState(0);
  const { isMobile } = useDevice();
  const [observations, setObservations] = useState(order.note);

  const onObservationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setObservations(event.target.value);
  }

  const onSubmit = () => {
    const PRODUCTS = order.products.map(({ product, quantity }) => `${quantity}x ${product.name}`).join('\n');
    const TOTAL = `${Number(order.total).toFixed(2)}`;
    const TIMESTAMP = dayjs().format('DD/MM/YYYY HH:mm');
    const NOMBRE_TIENDA = order.store.name;
    const NOTE = order.note || observations || "Sin observaciones.";

    const template = "Hola *{NOMBRE_TIENDA}*!\n\n*Este es mi pedido*:\n{PRODUCTS}\n\n*Observaciones*:\n{NOTE}\n\nTotal: *${TOTAL}*\n\n\n_fecha de emisión: {TIMESTAMP}_";

    const text = template
      .replace("{NOMBRE_TIENDA}", NOMBRE_TIENDA)
      .replace("{PRODUCTS}", PRODUCTS)
      .replace("{NOTE}", NOTE)
      .replace("{TOTAL}", TOTAL)
      .replace("{TIMESTAMP}", TIMESTAMP);

    window.open(`https://wa.me/${order.store.phone}?text=${encodeURIComponent(text)}`, '_blank');
    onRequestClose();
  }

  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const MemoizedProducts = useMemo(() => order.products.map(({ product, quantity }) => (
    <Paper key={product.id} shadow="none" py="sm" style={{ borderBottom: '1px solid #00000010' }}>
      <Flex gap="sm" align="center" justify="space-between">
        <Image
          src={product.images[0]?.uri || GenerateAvatar(product.name, 'avatar', true)}
          width={50}
          height={50}
          alt={product.name}
          priority
          style={{ borderRadius: '16px' }}
        />
        <Stack gap={0} style={{ flex: 1 }}>
          <Text tt="capitalize" fz="sm" lineClamp={1}>
            {product.name}
          </Text>
          <Text tt="capitalize" fz="xs" lineClamp={2}>
            {product.description}
          </Text>
        </Stack>
        <Counter value={quantity} onChange={(product_quantity) => onUpdateProductQuantity({ product, quantity }, product_quantity)} />
      </Flex>
    </Paper>
  )), [order.products]);

  const MemoizedProductsTicket = useMemo(() => order.products.map(({ product, quantity }) => (
    <Flex key={product.id} justify="space-between">
      <Text fz="xs" tt="lowercase" style={{ flex: 1 }} lineClamp={1}>
        {product.name}
      </Text>
      <Text fz="xs" style={{ width: 30 }} ta="center">
        {quantity}
      </Text>
      <Text fz="xs" style={{ width: 80 }} ta="end">
        {(Number(product.price.amount) * quantity).toFixed(2)}
      </Text>
    </Flex> 
  )), [order.products]);

  return (
    <Modal
      radius={isMobile ? 0 : 'md'}
      trapFocus={false}
      fullScreen={isMobile}
      withCloseButton={false}
      opened={opened}
      zIndex={500}
      onClose={onRequestClose}
    >
      <Stepper iconSize={28} radius="lg" size="xs" active={active}>
        <Stepper.Step>
          <Title order={2}>Tu orden</Title>
          <Space h="md" />
          {MemoizedProducts}
          <Space h="lg" />
          <Flex justify="space-between">
            <Text fw="bold">Total</Text>
            <Text>{`$ ${order.total.toFixed(2)}`}</Text>
          </Flex>
        </Stepper.Step>
        <Stepper.Step>
          <Title order={2}>Ticket</Title>
          <Space h="md" />
          <Flex justify="space-between">
            <Text fz="xs" style={{ flex: 1 }}>
              Producto
            </Text>
            <Text fz="xs" style={{ width: 30 }} ta="center">
              Cant
            </Text>
            <Text fz="xs" style={{ width: 80 }} ta="end">
              Precio
            </Text>
          </Flex>
          <Space h="xs" />
          {MemoizedProductsTicket}
          <Space h="sm" />
          <Flex justify="space-between">
            <Text fz="sm" fw="bold" style={{ flex: 1 }}>
              Total
            </Text>
            <Text fz="sm" fw="bold" ta="end">
              {`$ ${(order.total).toFixed(2)}`}
            </Text>
          </Flex> 
          <Space h="lg" />
          <Textarea
            label="Observaciones"
            placeholder="Ejemplo: La pizza la quiero sin ananá!"
            mt="md"
            autosize
            autoFocus={false}
            minRows={3}
            value={observations}
            onChange={onObservationChange}
          />
        </Stepper.Step>
      </Stepper>
      <Space h="lg" />
      <Flex gap="md">
        <Button fullWidth onClick={active === 0 ? onRequestClose : prevStep} variant="subtle">{active === 0 ? 'Cerrar' : 'Atrás'}</Button>
        <Button fullWidth onClick={active === 1 ? onSubmit : nextStep}>{ active === 1 ? 'Enviar' : 'Siguiente' }</Button>
      </Flex>
    </Modal>
  )
}
