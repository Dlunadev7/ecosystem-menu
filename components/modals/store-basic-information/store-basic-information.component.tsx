import { useEffect, useState } from "react";

import { StoreEntity } from "@ecosystem-ar/sdk";
import { Button, Group, LoadingOverlay, Modal, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useTenant } from "@/shared/hooks/tenant";
import { notifications } from "@mantine/notifications";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { useSDK } from "@/shared/api";
import { ValidatePhoneNumber } from "@/shared/utils/phone.util";

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
      phone: store?.phone,
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

    const updates = {...form.values};

    const { isValid, number } = ValidatePhoneNumber(`${updates.phone}`);
    
    if (isValid) {
      updates.phone = number;
    }

    stores.update(store.id, updates)
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
    <Modal title="Información básica" opened={opened} onClose={onClose}>
      <form onSubmit={form.onSubmit(onStoreUpdate)}>
        <Stack>
          <Group grow>
            <TextInput label="Nombre" defaultValue={store?.name} required {...form.getInputProps("name")}/>
            <TextInput
              label="URL de la tienda"
              value={`https://${host}/${store.slug}`}
              disabled
            />
          </Group>
          <TextInput
            label="Número de teléfono"
            description="Se utilizara para tomar pedidos por WhatsApp"
            leftSection={<Text fz="sm" mx="sm">+54</Text>}
            placeholder="011 23456789"
            value={ValidatePhoneNumber(`${form.values.phone}`).national}
            onChange={(event) => form.setFieldValue("phone", event.currentTarget.value)}
          />
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