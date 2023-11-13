import { useEffect, useState } from "react";
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { useProducts } from "@/shared/hooks/products/products";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { IDType, ProductEntity } from "@ecosystem-ar/sdk";
import { useCategories } from "@/shared/hooks/categories";
import { dataURItoBlob } from "@/shared/utils/avatars";
import { Cropper, FileSelector } from "@components";
import { useSDK } from "@/shared/api";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  store: IDType;
  product?: ProductEntity;
}

const INITIAL_FORM = {
  name: '',
  description: '',
  price: {
    amount: 0.00,
    currency: 'ars',
  },
  active: true,
  category: '',
}

export function ProductModal({ open, onClose, store, product }: ProductModalProps) {
  const { products } = useSDK();
  const { refetch_products } = useProducts(store);
  const { categories } = useCategories(store);

  const [mediaToLink, setMediaToLink] = useState<string[] | []>([]);
  const [mediaToUnlink, setMediaToUnlink] = useState<string[] | []>([]);
  const [file, setFile] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);

  const form = useForm({ initialValues: INITIAL_FORM });

  const onRequestClose = () => {
    onClose();
    form.reset();
    setMediaToLink([]);
    setMediaToUnlink([]);
    setFile(undefined);
  }

  const onFileSelection = (file: File | null) => {
    if (file) setFile(file);
  }

  const onRemoveMedia = (uri: string) => {
    const updated_media = mediaToLink.filter((url) => uri !== url);
    setMediaToLink(updated_media);
    setMediaToUnlink([...mediaToUnlink, uri]);
  }

  const filesToUpload = (uris: string[], product: ProductEntity) => {
    if (!product.images || !product.images.length) return uris;
    return uris.filter(uri => !product.images.map(image => image.uri).includes(uri))
  }

  const filesToRemove = (uris: string[], product: ProductEntity) => {
    return product.images.filter(image => uris.includes(image.uri)).map(image => image.id);
  }

  const onProductCreate = (values: any) => {
    setLoading(true);
    notifications.show(NOTIFICATIONS.PRODUCT_CREATION_PENDING);

    const category = categories && categories.find(category => category.id === values.category);
    const converted_media = mediaToLink.length ? mediaToLink.map(dataURItoBlob) : undefined;
    
    products.create(store, { ...values, category }, converted_media)
      .then(() => {
        refetch_products();
        notifications.update(NOTIFICATIONS.PRODUCT_CREATION_SUCCESS);
        onRequestClose();
      })
      .catch(() => notifications.update(NOTIFICATIONS.PRODUCT_CREATION_FAILED))
      .finally(() => setLoading(false))
  }

  const onProductUpdate = (values: any) => {
    setLoading(true);

    notifications.show(NOTIFICATIONS.PRODUCT_UPDATE_PENDING);
    const category = categories && categories.find(category => category.id === values.category);

    const files_to_upload = filesToUpload(mediaToLink, product as ProductEntity);
    const files_to_remove = filesToRemove(mediaToUnlink, product as ProductEntity);

    const link_media = files_to_upload.length ? files_to_upload.map(dataURItoBlob) : undefined;
    const unlink_media = files_to_remove.length ? files_to_remove : undefined;

    // @ts-ignore 
    products.update(store, product.id, { ...values, category }, link_media, unlink_media)
      .then(() => {
        notifications.update(NOTIFICATIONS.PRODUCT_UPDATE_SUCCESS);
        refetch_products();
        onRequestClose();
      })
      .catch(() => notifications.update(NOTIFICATIONS.PRODUCT_UPDATE_FAILED))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (product) {
      form.setValues({
        name: product.name,
        description: product.description,
        price: {
          amount: Number(product.price.amount),
          currency: product.price.currency,
        },
        active: product.active,
        category: product.category?.id,
      })
      if (product.images?.length) {
        setMediaToLink(product.images.map(image => image.uri));
      }
    }
  }, [product])

  return (
    <Modal
      opened={open}
      onClose={onRequestClose} title={file ? "Edita la imagen" : !product ? "Crea tu producto" : "Edita tu producto"}
      trapFocus={false}
    >
      {file ? (
        <Cropper
          image={file}
          onFinish={(file) => setMediaToLink([...mediaToLink, file])}
          onCancel={() => setFile(undefined)}
        />
      ) : (
        <form onSubmit={form.onSubmit(product ? onProductUpdate : onProductCreate)}>
          <Stack>
            <FileSelector media={mediaToLink} onSelect={onFileSelection} onRemove={onRemoveMedia} />
            <Group grow>
              <TextInput withAsterisk label="Nombre" required {...form.getInputProps('name')} />
              <NumberInput
                label="Precio"
                decimalSeparator=","
                defaultValue={0.5}
                hideControls
                fixedDecimalScale
                decimalScale={2}
                step={0.5}
                onChange={(e) => form.setFieldValue('price.amount', e)}
                value={form.getInputProps('price.amount').value}
              />
            </Group>
            <Select
              data={categories.map((category) => ({ label: category.name, value: category.id }))}
              label="Categoria"
              searchable
              disabled={!categories?.length}
              {...form.getInputProps('category')}
            />
            <Textarea label="Descripción del producto" {...form.getInputProps('description')} autosize minRows={4} />
            <Group grow>
              <Button variant="subtle" onClick={onRequestClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Listo
              </Button>
            </Group>
          </Stack>
          <LoadingOverlay visible={loading} overlayProps={{ blur:2 }} />
        </form>
      )}
    </Modal>
  )
}