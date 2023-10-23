import { useState } from "react";

import { useSDK } from "@/shared/api";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { StoreEntity, AddressType } from "@ecosystem-ar/sdk";

import { Button, Group, LoadingOverlay, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

// const Map = dynamic(
//   () => import('../../../map/map.component'),
//   { ssr: false }
// )

type StoreAddressProps = {
  store: StoreEntity,
  opened: boolean,
  onRequestClose: () => void;
}

export function StoreAddress({ opened, onRequestClose, store }: StoreAddressProps) {
  const { stores } = useSDK();

  const [updatingStore, setUpdatingStore] = useState(false);

  const form = useForm({
    initialValues: {
      street_name: store?.address?.street_name,
      street_number: store?.address?.street_number,
      city: store?.address?.city,
      state: store?.address?.state,
      country: store?.address?.country,
      zip_code: store?.address?.zip_code,
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
    stores.update(store.id, { address: form.values as AddressType })
      .then(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_SUCCESS))
      .catch(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_FAILED))
      .finally(() => {
        setUpdatingStore(false);
        onRequestClose();
      });
  };

  return (
    <Modal title="Dirección" opened={opened} onClose={onClose}>
      <form onSubmit={form.onSubmit(onStoreUpdate)}>
        <Stack>
          <Group grow>
            <TextInput label="Calle" required placeholder="Jorge Luis Borges" {...form.getInputProps("street_name")} />
            <TextInput withAsterisk label="Altura" required placeholder="9814" {...form.getInputProps("street_number")} />
          </Group>
          <TextInput label="Pais" required placeholder="Argentina" defaultValue="Argentina" disabled {...form.getInputProps("address.country")} />
          <TextInput
            withAsterisk
            label="Provincia"
            required
            placeholder="Buenos Aires"
            defaultValue="Buenos Aires"
            disabled
            {...form.getInputProps("state")}
          />
          <Group grow>
            <TextInput label="Ciudad" required placeholder="Buenos Aires" {...form.getInputProps("city")} />
            <TextInput withAsterisk label="Codigo Postal" required placeholder="7600" {...form.getInputProps("zip_code")} />
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