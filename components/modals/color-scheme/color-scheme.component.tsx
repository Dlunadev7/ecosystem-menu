import { useSDK } from '@/shared/api';
import { NOTIFICATIONS } from '@/shared/constants/notifications';
import { StoreTheme } from '@ecosystem-ar/sdk';
import { Button, ColorInput, DEFAULT_THEME, Group, LoadingOverlay, MantineTheme, Modal, Select, Stack } from '@mantine/core'
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react'

export const ColorScheme = ({ opened, onRequestClose, store }: any) => {
  const { stores } = useSDK();
  const [updatingStore, setUpdatingStore] = useState(false);

  const form = useForm({
    initialValues: {
      color: {
        primary: store?.theme?.color?.primary,
        scheme: "light",
      },
      product_item: {
        border_radius: store?.theme?.product?.border_radius,
      },
      shadow: {
        color: store?.theme?.shadow?.color
      },
      typography: {
        font_family: store?.theme?.typography?.font_family,
        color: store?.theme?.typography?.color
      },
    },
  });

  const onReset = () => {
    form.setValues(store?.address || {});
    form.resetDirty();
  }

  const onClose = () => {
    onReset();
    onRequestClose();
  }

  const onStoreUpdate = () => {
    notifications.show(NOTIFICATIONS.STORE_UPDATE_PENDING);
    setUpdatingStore(true);
    stores.update(store.id, { theme: form.values as StoreTheme })
      .then(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_SUCCESS))
      .catch(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_FAILED))
      .finally(() => {
        setUpdatingStore(false);
        onRequestClose();
      });
  };

  function generateSwatchesFromTheme(theme: MantineTheme) {
    const swatches = Object.values(theme.colors).reduce(
      (acc, colorArray) => [...acc, ...colorArray] as any,
      []
    );
    return swatches;
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Personalizacion de tema">
      <form onSubmit={form.onSubmit(onStoreUpdate)}>
        <Stack>
          <ColorInput
            placeholder="Pick color"
            label="Color principal"
            disallowInput
            withPicker={false}
            swatches={generateSwatchesFromTheme(DEFAULT_THEME)}
            {...form.getInputProps("color.primary")}
          />
          <Select
            label="Bordeado de imagen"
            placeholder="Pick value"
            defaultValue="Medio"
            allowDeselect={false}
            data={["Bajo", "Medio", "Alto"]}
            {...form.getInputProps("product_item.border_radius")}
          />
          <ColorInput
            placeholder="Pick Value"
            label="Color de sombra del producto"
            disallowInput
            withPicker={false}
            swatches={generateSwatchesFromTheme(DEFAULT_THEME)}
            {...form.getInputProps("shadow.color")}
          />
          <Group grow>
          <Select
            label="Tipografia"
            placeholder="Pick value"
            defaultValue="Poppins"
            allowDeselect={false}
            {...form.getInputProps("typography.font_family")}
          />
          <ColorInput
            placeholder="Pick color"
            label="Color de fuente"
            disallowInput
            withPicker={false}
            swatches={generateSwatchesFromTheme(DEFAULT_THEME)}
            {...form.getInputProps("typography.color")}
            />
          </Group>
          <Group grow>
          </Group>
          <Group justify="flex-end">
            <Button variant="outline"type="submit" loading={updatingStore}>
              Guardar
            </Button>
          </Group>
        </Stack>
        <LoadingOverlay visible={updatingStore} overlayProps={{ blur: 2 }} />
      </form>
    </Modal>
  )
}
