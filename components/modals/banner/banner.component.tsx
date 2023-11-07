import { useEffect, useState } from "react";
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { useProducts } from "@/shared/hooks/products/products";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { IDType, MediaEntity, ProductEntity, StoreEntity } from "@ecosystem-ar/sdk";
import { useCategories } from "@/shared/hooks/categories";
import { dataURItoBlob } from "@/shared/utils/avatars";
import { Cropper, FileSelector } from "@components";
import { useSDK } from "@/shared/api";
import { useStore } from "@/shared/hooks/stores/store";
import { useRouter } from "next/router";
import { IconInfoCircle } from "@tabler/icons-react";

type BannerModalProps = {
  opened: boolean;
  onCloseRequest: () => void;
  store: StoreEntity;
  refetch_store: () => {};
}


export function BannerModal({ opened, onCloseRequest, store, refetch_store }: BannerModalProps) {
  const { stores } = useSDK();
  const [mediaToLink, setMediaToLink] = useState<string[] | []>([]);
  const [mediaToUnlink, setMediaToUnlink] = useState<string[] | []>([]);
  const [file, setFile] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);
  
  const form = useForm();
  
  const onRequestClose = () => {
    onCloseRequest();
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

  const filesToUpload = (uris: string[], banners: any) => {
    if (!banners || !banners.length) return uris;
    return uris.filter(uri => !banners?.map((banner: any) => banner.uri).includes(uri))
  }

  const filesToRemove = (uris: string[], product: ProductEntity) => {
    return store?.banners?.filter(image => uris.includes(image.uri)).map(image => image.id);
  }

  const onAddBanner = () => {
    setLoading(true);
    notifications.show(NOTIFICATIONS.STORE_UPDATE_PENDING);
    const converted_media = mediaToLink.length ? mediaToLink.map(dataURItoBlob) : undefined;

    stores.addBanners(store?.id as string, converted_media as File[])
      .then(() => {
        notifications.update(NOTIFICATIONS.STORE_UPDATE_SUCCESS);
        onRequestClose();
      })
      .catch(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_FAILED))
      .finally(() => setLoading(false))
  }

  const onProductUpdate = async () => {
    setLoading(true);
    notifications.show(NOTIFICATIONS.STORE_UPDATE_PENDING);
  
    const filesToUploadResult = filesToUpload(mediaToLink, store?.banners as any);
    const filesToRemoveResult = filesToRemove(mediaToUnlink, store?.banners as any);
  
    const link_media = filesToUploadResult.length ? filesToUploadResult.map(dataURItoBlob) : undefined;
    const unlink_media = filesToRemoveResult?.length ? filesToRemoveResult : undefined;
  
    try {
      if (filesToUploadResult.length) {
        // @ts-ignore
        await stores.addBanners(store.id, link_media);
      }
  
      if (filesToRemoveResult?.length) {
        // @ts-ignore
        await stores.removeBanners(store.id, unlink_media);
      }
  
      notifications.update(NOTIFICATIONS.STORE_UPDATE_SUCCESS);
      refetch_store();
      onRequestClose();
    } catch (error) {
      notifications.update(NOTIFICATIONS.STORE_UPDATE_FAILED);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(store) {
      if (store?.banners?.length) {
        setMediaToLink(store.banners.map((banners) => banners.uri));
      }
    }
  }, [store.banners, store, opened])


  return (
    <Modal
      opened={opened}
      onClose={onRequestClose} title={file ? "Edita la imagen" : !store.banners ? "Añade tu portada" : "Edita tu portada"}
      trapFocus={false}
    >
      {file ? (
        <Cropper
          image={file}
          onFinish={(file) => setMediaToLink([...mediaToLink, file])}
          onCancel={() => setFile(undefined)}
          aspectRatio={21/9}
          resizable={false}
        />
      ) : (
        <form onSubmit={form.onSubmit(store?.banners ? onProductUpdate: onAddBanner)}>
          <Stack>
            <FileSelector media={mediaToLink} onSelect={onFileSelection} onRemove={onRemoveMedia} />
            <Group justify="space-between" my={12}>
              <IconInfoCircle />
              <Text style={{ flex: 1 }} fz={"sm"}>Si usas solo una foto, lo veras como portada, si agregas mas foto, se vera como un banner.</Text>
            </Group>
            <Group grow>
              <Button variant="subtle" onClick={onRequestClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Añadir
              </Button>
            </Group>
          </Stack> 
          <LoadingOverlay visible={loading} overlayProps={{ blur:2 }} />
        </form>
      )}
    </Modal>
  )
}