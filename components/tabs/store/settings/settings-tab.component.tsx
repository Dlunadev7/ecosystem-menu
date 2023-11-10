import React, { useState } from "react";
import { useAuth } from "@/context/auth/auth.context";
import { useStore } from "@/shared/hooks/stores/store";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { notifications } from "@mantine/notifications";
import { useSDK } from "@/shared/api";
import { useRouter } from "next/router";
import { FileDownloader } from "@/shared/utils/files/download-file.util";

import { Card, Cropper, FileButton, Splash } from "@components";
import { RandomAvatar, dataURItoBlob } from "@/shared/utils/avatars";
import { Button, Flex, Image, Modal, Paper, ScrollArea, SimpleGrid, Space, Stack, Tabs, Text, Title, useMantineTheme } from "@mantine/core";
import { StoreBasicInformation } from "@/components/modals/store-basic-information/store-basic-information.component";
import { StoreAddress } from "@/components/modals/store-address/store-address.component";
import { SocialNetwork } from "@/components/modals/social-network/social-network.component";
import { ColorScheme } from "@/components/modals/color-scheme/color-scheme.component";
import { BannerModal } from "@/components/modals/banner/banner.component";

import styles from './settings-tab.module.scss';

export function SettingsTab() {
  const router = useRouter();
  const { loading, logged } = useAuth();
  const { store, refetch_store } = useStore(router.query.slug as string);
  const [imageToCrop, setImageToCrop] = useState<File | null>();

  const [placeholderProduct, setPlaceholderProduct] = useState(false)

  const [updateLogo, setUpdateLogo] = useState(false);
  const [downloadQR, setDownloadQR] = useState(false);
  const [updatePlaceholder, setUpdatePlaceholder] = useState(false);

  const [editBasicInformation, setEditBasicInformation] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editSocialNetwork, setEditSocialNetwork] = useState(false);
  const [editColorScheme, setEditColorScheme] = useState(false);
  const [editBanner, setEditBanner] = useState(false);
  const { stores } = useSDK();
  const theme = useMantineTheme();
  if (loading || !logged || !store) {
    return (
      <Splash loading={loading} notfound={!store} unauthorized={!logged} />
    );
  }

  const onSelectNewAvatar = (file: File | null) => {
    if (!file) return;
    setImageToCrop(file);
  };
  
  const onSelectProductPlaceholder = (file: File | null) => {
    if (!file) return;
    setPlaceholderProduct(true);
    setImageToCrop(file);
  };

  const generateQR = () => {
    notifications.show(NOTIFICATIONS.STORE_QR_GENERATION_PENDING);
    setDownloadQR(true);

    stores.generateQR(store.slug)
      .then(() => {
        setTimeout(() => {
          notifications.update(NOTIFICATIONS.STORE_QR_GENERATION_SUCCESS);
          setDownloadQR(false);
          refetch_store();
        }, 1500);
      })
      .catch(() => {
        notifications.update(NOTIFICATIONS.STORE_QR_GENERATION_FAILED);
        setDownloadQR(false);
      });
  };

  
  const onDownloadQrRequest = async (imageUrl: string) => {
    await FileDownloader({
      uri: imageUrl,
      filename: `${store.name}-qr`,
      onSuccess: () => notifications.show(NOTIFICATIONS.STORE_QR_DOWNLOAD_SUCCESS),
      onError: () => notifications.show(NOTIFICATIONS.STORE_QR_DOWNLOAD_FAILED),
    });
  };

  const onUpdateAvatar = (image: string) => {
    notifications.show(NOTIFICATIONS.CHANGE_STORE_AVATAR_PENDING);
    setUpdateLogo(true);
    stores.addAvatar(store.id, dataURItoBlob(image))
      .then(() => {
        setTimeout(() => {
          notifications.update(NOTIFICATIONS.CHANGE_STORE_AVATAR_SUCCESS);
          refetch_store();
          setUpdateLogo(false);
          setImageToCrop(null);
        }, 1500);
      })
      .catch(() => {
        notifications.update(NOTIFICATIONS.CHANGE_STORE_AVATAR_FAILED);
        setUpdateLogo(false);
      });
  };

  const onRemoveAvatar = () => {
    notifications.show(NOTIFICATIONS.CHANGE_STORE_AVATAR_PENDING);
    setUpdateLogo(true);
    stores.delAvatar(store.id, store.avatar?.id as any)
      .then(() => {
        setTimeout(() => {
          notifications.update(NOTIFICATIONS.CHANGE_STORE_AVATAR_SUCCESS);
          setImageToCrop(null);
          refetch_store();
          setUpdateLogo(false);
        }, 1500);
      })
      .catch(() => {
        notifications.update(NOTIFICATIONS.CHANGE_STORE_AVATAR_FAILED);
        setUpdateLogo(false);
      });
  };

  const onUpdateProductPalceholder = (image: string) => {
    notifications.show(NOTIFICATIONS.UPDATE_STORE_PLACEHOLDER_PENDING);
    setUpdatePlaceholder(true);
    stores.addPlaceholderImage(store.id, dataURItoBlob(image))
      .then(() => {
        setTimeout(() => {
          notifications.update(NOTIFICATIONS.UPDATE_STORE_PLACEHOLDER_SUCCESS);
          refetch_store();
          setUpdatePlaceholder(false);
          setImageToCrop(null);
        }, 1500);
      })
      .catch(() => {
        notifications.update(NOTIFICATIONS.UPDATE_STORE_PLACEHOLDER_FAILED);
        setUpdatePlaceholder(false);
      });
  };

  const onRemoveProductPlaceholder = () => {
    notifications.show(NOTIFICATIONS.DELETE_STORE_PLACEHOLDER_PENDING);
    setUpdatePlaceholder(true);
    stores.removePlaceholderImage(store.id, store.placeholder_image?.id as string)
      .then(() => {
        setTimeout(() => {
          notifications.update(NOTIFICATIONS.DELETE_STORE_PLACEHOLDER_SUCCESS);
          setImageToCrop(null);
          refetch_store();
          setUpdatePlaceholder(false);
        }, 1500);
      })
      .catch(() => {
        notifications.update(NOTIFICATIONS.DELETE_STORE_PLACEHOLDER_FAILED);
        setUpdatePlaceholder(false);
      });
  };

  const logo = store.avatar?.uri || RandomAvatar(store.name)
  const product_placeholder = store.placeholder_image?.uri || RandomAvatar(store.name)
  
  return (
    <Tabs.Panel value="settings" pb="xs" className={styles.tab_panel}>
      <Space h={32} />
      <ScrollArea type="never" mb="xl" mt="x">
        <Flex gap="xs" justify="flex-start" align="flex-start" direction="row" wrap="nowrap" px={8}>
          <Paper withBorder style={{ overflow: "hidden", width: 250, height: 125 }}>
            <Flex>
              <Image w={125} h={125} src={logo} style={{ borderRadius: 8 }} alt={logo} />
              <Stack align="flex-end" p="xs" justify="end" style={{ width: "100%" }}>
                <Text>Logo</Text>
                {store.avatar ? (
                  <Button loading={updateLogo} variant="outline" size="xs" onClick={onRemoveAvatar}>
                    Eliminar
                  </Button>
                ) : (
                  <FileButton watch={Boolean(imageToCrop)} onSelect={onSelectNewAvatar}>
                    <Button loading={updateLogo} variant="outline" size="xs">
                      {store?.avatar && !imageToCrop && "Eliminar"}
                      {!store?.avatar && !imageToCrop && "Añadir"}
                      {imageToCrop && "Editando"}
                    </Button>
                  </FileButton>
                )}
              </Stack>
            </Flex>
          </Paper>
          <Paper withBorder style={{ overflow: "hidden", width: 250, height: 125 }}>
            <Flex>
              <Image width={125} height={125} src={store.qr?.uri || RandomAvatar(store.name)} style={{ borderRadius: 8 }} alt={store.qr?.uri} />
              <Stack align="flex-end" p="xs" justify="end" style={{ width: "100%" }}
              >
                <Text>QR</Text>
                {
                  store.qr?.uri ? (
                    <Button
                    loading={downloadQR}
                    variant="outline"
                    size="xs"
                    onClick={() => onDownloadQrRequest(store.qr?.uri)}
                  >
                    Descargar
                  </Button>
                  ) : 

                  <Button
                    loading={downloadQR}
                    variant="outline"
                    disabled={Boolean(store.qr?.uri) || downloadQR}
                    size="xs"
                    onClick={generateQR}
                  >
                    Generar
                  </Button>
                }
              </Stack>
            </Flex>
          </Paper>
          <Paper withBorder style={{ overflow: "hidden", width: 250, height: 125 }}>
            <Flex>
              <div className={styles.animated_card}>
                {
                  store.banners?.map((media) => (
                    <Image src={media.uri} alt={media.uri} key={media.id} width={125} height={125} />
                  ))
                }
              </div>
              <Stack align="flex-end" p="xs" justify="end" style={{ width: "100%" }}>
                <Text>Banner</Text>
                {Boolean(store?.banners?.length) ? (
                  <Button variant="outline" size="xs" onClick={() => setEditBanner(true)}>
                    Editar
                  </Button>
                ) : (
                  <Button onClick={() => setEditBanner(true)} variant="outline" size="xs">
                    {store?.avatar && !imageToCrop && "Editar"}
                    {!store?.avatar && !imageToCrop && "Añadir"}
                    {imageToCrop && "Editando"}
                  </Button>
                )}
              </Stack>
            </Flex>
          </Paper>
          <Paper withBorder style={{ overflow: "hidden", width: 250, height: 125 }}>
            <Flex>
              <Image w={125} h={125} src={product_placeholder} style={{ borderRadius: 8 }} alt="" />
              <Stack align="flex-end" p="xs" justify="end" style={{ width: "100%" }}>
                <Text ta="right">Foto de producto</Text>
                {store.placeholder_image ? (
                  <Button loading={updatePlaceholder} variant="outline" size="xs" onClick={onRemoveProductPlaceholder}>
                    Eliminar
                  </Button>
                ) : (
                  <FileButton watch={Boolean(imageToCrop)} onSelect={onSelectProductPlaceholder}>
                    <Button loading={updatePlaceholder} variant="outline" size="xs">
                      {store?.placeholder_image && !imageToCrop && "Eliminar"}
                      {!store?.placeholder_image && !imageToCrop && "Añadir"}
                      {imageToCrop && "Editando"}
                    </Button>
                  </FileButton>
                )}
              </Stack>
            </Flex>
          </Paper>
        </Flex>
      </ScrollArea>
      <SimpleGrid spacing="sm" cols={{base: 1, md: 2}}>
        <Card>
          <Stack gap="md">
            <Title order={2} size="xs">Información básica</Title>
            <Text size="xs">Información de contacto, email, descripción, telefono y mucho más!</Text>
            <Stack align="flex-end">
              <Button onClick={() => setEditBasicInformation(true)}>
                Editar
              </Button>
            </Stack>
          </Stack>
        </Card>
        <Card>
          <Stack gap="md">
            <Title order={2} size="xs">Dirección</Title>
            <Text size="xs">Esta información es muy importante para el sistema de Takeaway y Delivery!</Text>
            <Stack align="flex-end">
              <Button onClick={() => setEditAddress(true)}>
                Editar
              </Button>
            </Stack>
          </Stack>
        </Card>
        <Card>
          <Stack gap="md">
            <Title order={2} size="xs">Redes Sociales</Title>
            <Text size="xs">¡Configura tus redes para que tus clientes puedan acceder a todo tu contenido!</Text>
            <Stack align="flex-end">
              <Button onClick={() => setEditSocialNetwork(true)}>
                Editar
              </Button>
            </Stack>
          </Stack>
        </Card>
        <Card>
          <Stack gap="md">
            <Title order={2} size="xs">Esquema de colores</Title>
            <Text size="xs">Definí el color de tu marca, diseño de imágenes y mucho más.</Text>
            <Stack align="flex-end">
              <Button onClick={() => setEditColorScheme(true)}>
                Editar
              </Button>
            </Stack>
          </Stack>
        </Card>
        <Card>
          <Stack gap="md">
            <Title order={2} size="xs">Mercado Pago</Title>
            <Text size="xs">Configurá los accesos a Mercado Pago para que tus clientes puedan comprar en línea.</Text>
            <Stack align="flex-end">
              <Button disabled>
                Próximamente
              </Button>
            </Stack>
          </Stack>
        </Card>
      </SimpleGrid>
      <Modal opened={Boolean(imageToCrop)} withCloseButton={false} onClose={() => setImageToCrop(null)}>
        <Cropper image={imageToCrop as File} onCancel={() => setImageToCrop(null)} onFinish={placeholderProduct ? onUpdateProductPalceholder : onUpdateAvatar} />
      </Modal>
      <StoreBasicInformation store={store} opened={editBasicInformation} onRequestClose={() => setEditBasicInformation(false)} />
      <StoreAddress store={store} opened={editAddress} onRequestClose={() => setEditAddress(false)} />
      <SocialNetwork store={store} opened={editSocialNetwork} onRequestClose={() => setEditSocialNetwork(false)} />
      <ColorScheme store={store} opened={editColorScheme} onRequestClose={() => setEditColorScheme(false)} />
      <BannerModal store={store} opened={editBanner} refetch_store={refetch_store} onCloseRequest={() => setEditBanner(false)} />
    </Tabs.Panel>
  )
}

