import { useEffect, useState } from "react";
import { Button, Group, LoadingOverlay, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { useCategories } from "@/shared/hooks/categories";
import { useSDK } from "@/shared/api";

export function CreateCategoryModal({ open, onClose, store, category }: { open: boolean, onClose: () => void, store: string, category: any }) {
  const { categories } = useSDK();
  const { refetch_categories } = useCategories(store);
  const [loadingCategoryCreation, setLoadingCategoryCreation] = useState(false);

  
  const create_category_form = useForm({
    initialValues: {
      name: '',
      description: '',
    }
  });

  const onRequestClose = () => {
    onClose();
    create_category_form.reset();
  }

  const onCategoryCreation = (values: any) => {
    setLoadingCategoryCreation(true);

    notifications.show(NOTIFICATIONS.CATEGORY_CREATION_PENDING);

    categories.create(store, values)
      .then(() => {
        setTimeout(() => {
          notifications.update(NOTIFICATIONS.CATEGORY_CREATION_SUCCESS);
          refetch_categories();
          setLoadingCategoryCreation(false);
          onClose();
          create_category_form.reset();
        }, 2000)
      })
      .catch(() => {
        notifications.update(NOTIFICATIONS.CATEGORY_CREATION_FAILED)
        setLoadingCategoryCreation(false);
      })
  }

  const onCategoryUpdate = (values: any) => {
    setLoadingCategoryCreation(true);

    notifications.show(NOTIFICATIONS.CATEGORY_UPDATE_PENDING);

    categories.update(store, category.id, {...values}).then(() => {
      setTimeout(() => {
        notifications.update(NOTIFICATIONS.CATEGORY_UPDATE_SUCCESS);
        refetch_categories();
        create_category_form.reset();
        onRequestClose()
        setLoadingCategoryCreation(false);
      }, 2000)
    })
    .catch(() => {
      notifications.update(NOTIFICATIONS.CATEGORY_UPDATE_FAILED);
      setLoadingCategoryCreation(false);
    });
  }

  useEffect(() => {
    if (category) {
      create_category_form.setValues({
        name: category.name,
        description: category.description,
      })
    }
  }, [category])

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Crea tu categoria"
      overlayProps={{ opacity: 0.8 }}
      transitionProps={{ transition: 'slide-down' }}
    >
      <form onSubmit={create_category_form.onSubmit(category ? onCategoryUpdate : onCategoryCreation)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Nombre"
            required
            placeholder=""
            {...create_category_form.getInputProps('name')}
          />
          <Textarea
            label="Descripción de la categoria"
            withAsterisk
            {...create_category_form.getInputProps('description')}
            autosize
            minRows={4}
          />
          <Group grow>
            <Button
              variant="outline"
              onClick={() => {
                create_category_form.reset();
                onClose();
              }} 
            >
              Cancelar
            </Button>
            <Button type="submit">
              Listo!
            </Button>
          </Group>
        </Stack>
      </form>
      <LoadingOverlay visible={loadingCategoryCreation} overlayProps={{blur: 2}}  />
    </Modal>
  )
}