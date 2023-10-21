import { useSDK } from '@/shared/api';
import { NOTIFICATIONS } from '@/shared/constants/notifications';
import { StoreTheme } from '@ecosystem-ar/sdk';
import { Button, ColorInput, ColorSwatch, DEFAULT_THEME, Group, LoadingOverlay, Modal, Select, Stack } from '@mantine/core'
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react'
import { generateColors } from '@mantine/colors-generator';

export const ColorScheme = ({ opened, onRequestClose, store }: any) => {
  const { stores } = useSDK();
  const [updatingStore, setUpdatingStore] = useState(false);

  const form = useForm<StoreTheme>({
    initialValues: {
      color: {
        brand: store.theme?.color.brand || DEFAULT_THEME.colors.dark as any,
        scheme: store.theme?.color.scheme || "light",
      },
      product_item: {
        border_radius: 16,
      },
      shadow: {
        color: store.theme?.shadow.color || DEFAULT_THEME.black,
      },
      typography: {
        font_family: 'Inter',
        color: store.theme?.typography?.color || DEFAULT_THEME.black,
      },
    },
  });

  const onReset = () => {
    form.resetDirty();
  }

  const onClose = () => {
    onReset();
    onRequestClose();
  }

  const onStoreUpdate = () => {
    notifications.show(NOTIFICATIONS.STORE_UPDATE_PENDING);
    setUpdatingStore(true);

    const theme: StoreTheme = {
      ...form.values,
      typography: {
        font_family: 'Inter',
        color: form.values.color.scheme === 'light' ? DEFAULT_THEME.white : DEFAULT_THEME.black,
      }
    }

    stores.update(store.id, { theme })
      .then(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_SUCCESS))
      .catch(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_FAILED))
      .finally(() => {
        setUpdatingStore(false);
        onRequestClose();
      });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Colores del menú">
      <form onSubmit={form.onSubmit(onStoreUpdate)}>
        <Stack>
          <ColorInput
            label="Color principal"
            withEyeDropper={false}
            format="hexa"
            {...form.getInputProps("color.brand")}
            value={form.values.color.brand[6]}
            onChange={(color) => {
              form.setFieldValue("color.brand", generateColors(color))
            }}
          />
          <Group grow gap="xs">
            {form.values.color.brand.map((color, index) => (
              <ColorSwatch color={color} key={index} />
            ))}
          </Group>
          <ColorInput
            label="Color de las sombras"
            format='hexa'
            withEyeDropper={false}
            {...form.getInputProps("shadow.color")}
          />
          <Group grow>
            <Select
              label="Tipografia"
              allowDeselect={false}
              disabled
              defaultValue="Inter"
              data={[ { value: "Inter", label: "Inter" }]}
              {...form.getInputProps("typography.font_family")}
            />
            <ColorInput
              label="Color de fuente"
              withEyeDropper={false}
              disabled
              format="hexa"
              {...form.getInputProps("typography.color")}
            />
            <Select
              label="Modo"
              allowDeselect={false}
              data={[ { value: "light", label: "Claro" }, { value: "dark", label: "Oscuro" }]}
              {...form.getInputProps("color.scheme")}
            />
          </Group>
          <Button variant="outline" type="submit" loading={updatingStore}>
            Guardar
          </Button>
        </Stack>
        <LoadingOverlay visible={updatingStore} overlayProps={{ blur: 2 }} />
      </form>
    </Modal>
  )
}
