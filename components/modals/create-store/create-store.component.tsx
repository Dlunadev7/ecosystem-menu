import { Button, Group, LoadingOverlay, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import { useUserStores } from "@/shared/hooks/stores";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { useAuth } from "@/context/auth/auth.context";
import { useTenant } from "@/shared/hooks/tenant";
import { useSDK } from "@/shared/api";

export function CreateStoreModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const tenant = useTenant();
  const { token, user } = useAuth();
  const { stores } = useSDK();

  const { refetch_user_stores } = useUserStores(token);

  const [loadingStoreCreation, setLoadingStoreCreation] = useState(false);

  const create_store_form = useForm({
    initialValues: {
      name: '',
      email: '',
      slug: '',
      description: '',
    }
  })

  const onStoreCreation = (values: any) => {
    setLoadingStoreCreation(true);

    notifications.show(NOTIFICATIONS.STORE_CREATION_PENDING);

    stores.create(values)
      .then(() => {
        setTimeout(() => {
          notifications.update(NOTIFICATIONS.STORE_CREATION_SUCCESS);
          create_store_form.reset();
          refetch_user_stores();
          setLoadingStoreCreation(false);
          onClose();
        }, 1500)
      })
      .catch(() => {
        notifications.update(NOTIFICATIONS.STORE_CREATION_FAILED);
        setLoadingStoreCreation(false);
      })
  }

  const slugNormalizer = (slug: string) => {
    const slug_without_chars = slug.replaceAll(/[^a-zA-Z- ]/g, '');
    const slug_without_spaces = slug_without_chars.replaceAll(' ', '-');
    const normalized_slug = slug_without_spaces.toLowerCase();
    
    create_store_form.setFieldValue('slug', normalized_slug);

    return normalized_slug;
  }

  useEffect(() => {
    if (!create_store_form.isTouched('slug') && create_store_form.getInputProps('name').value) {
      create_store_form.setFieldValue('slug', slugNormalizer(create_store_form.getInputProps('name').value));
      create_store_form.resetTouched();
    }
  }, [create_store_form.getInputProps('name').value])

  useEffect(() => {
    create_store_form.setValues({
      email: user.email,
    })
  }, [open])

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Creá tu tienda"
      keepMounted={false}
    >
      <form onSubmit={create_store_form.onSubmit(onStoreCreation)}>
        <Stack>
          <Group grow>
            <TextInput
              withAsterisk
              label="Nombre"
              required
              placeholder="Mi tienda"
              {...create_store_form.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              label="Email de contacto"
              required
              type="email"
              placeholder="info@mitienda.com"
              {...create_store_form.getInputProps('email')}
            />

          </Group>
          <TextInput
            withAsterisk
            required
            label="URL de la tienda"
            description={`https://${tenant.host}/${create_store_form.getInputProps('slug').value}`}
            {...create_store_form.getInputProps('slug')}
            onChange={({ target }) => slugNormalizer(target.value)}
          />
          <Textarea
            label="Breve descripción"
            placeholder="La tienda con los mejores productos del pais."
            withAsterisk
            autosize
            minRows={4}
            {...create_store_form.getInputProps('description')}
          />
          <Group grow>
            <Button
              variant="outline"
              onClick={() => {
                create_store_form.reset();
                onClose();
              }} 
            >
              Cancelar
            </Button>
            <Button type="submit">
              Listo
            </Button>
          </Group>
        </Stack>
      </form>
      <LoadingOverlay visible={loadingStoreCreation} overlayProps={{ blur: 2 }} />
    </Modal>
  )
}