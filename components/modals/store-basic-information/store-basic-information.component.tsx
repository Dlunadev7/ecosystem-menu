import { useEffect, useState } from "react";

import { StoreEntity } from "@ecosystem-ar/sdk";
import { Button, Group, LoadingOverlay, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useTenant } from "@/shared/hooks/tenant";
import { notifications } from "@mantine/notifications";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { useSDK } from "@/shared/api";

type StoreBasicInformationProps = {
  store: StoreEntity,
  opened: boolean,
  onRequestClose: () => void;
}

export function StoreBasicInformation({ store, opened, onRequestClose }: StoreBasicInformationProps) {
  const { host } = useTenant();
  const { stores } = useSDK();
  const [updatingStore, setUpdatingStore] = useState(false);

  const form = useForm({
    initialValues: {
      name: store?.name,
      email: store?.email,
      description: store?.description,
    },
  });

  const onReset = () => {
    form.setValues(store);
    form.resetDirty();
  }

  const onClose = () => {
    onReset();
    onRequestClose();
  }

  const onStoreUpdate = () => {
    notifications.show(NOTIFICATIONS.STORE_UPDATE_PENDING);
    setUpdatingStore(true);
    stores.update(store.id, form.values)
      .then(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_SUCCESS))
      .catch(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_FAILED))
      .finally(() => {
        setUpdatingStore(false);
        onRequestClose();
      });
  };

  useEffect(() => {
    if (store && !form.getInputProps("slug").value) onReset();
  }, [store]);

  return (
    <Modal opened={opened} onClose={onClose}>
      <form onSubmit={form.onSubmit(onStoreUpdate)}>
        <Stack>
          <Group grow>
            <TextInput label="Nombre" value={store?.name} disabled />
            <TextInput
              label="URL de la tienda"
              value={`https://${host}/${store.slug}`}
              disabled
            />
          </Group>
          <TextInput
            withAsterisk
            label="Email"
            required
            placeholder="info@lahamburgueseria.com"
            {...form.getInputProps("email")}
          />
          <Textarea
            label="Breve Descripción"
            withAsterisk
            {...form.getInputProps("description")}
            autosize
            minRows={4}
          />
          <Group justify="right">
            <Button variant="outline" type="submit" loading={updatingStore}>
              Guardar
            </Button>
          </Group>
        </Stack>
        <LoadingOverlay visible={updatingStore} overlayProps={{ blur: 2 }} />
      </form>
    </Modal>
  )
}