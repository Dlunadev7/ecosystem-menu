import React, { useState } from "react";
import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSDK } from "@/shared/api";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { getSocialNetworkByURL } from "@/shared/helpers/getSocialNetworkByURL";
import { SocialNetwork as SocialNetworkEnum, SocialNetworks, StoreEntity } from "@ecosystem-ar/sdk";
import { notifications } from "@mantine/notifications";
import { SocialNetworkIcon } from "@/shared/utils/social-networks";
import { Cross2Icon } from "@radix-ui/react-icons";

const initialSocialsNetworks = (store: StoreEntity) => ({
  initialValues: store?.social_networks
})

export const SocialNetwork = ({ opened, onRequestClose, store }: any) => {
  const { stores } = useSDK();
  const [updatingStore, setUpdatingStore] = useState(false);
  const { initialValues }  = initialSocialsNetworks(store);

  const form = useForm({
    initialValues: {
      social: initialValues,
    },
  });

  const [inputSocialNetwork, setInputSocialNetwork] = useState("");
  const [socialsToLink, setSocialsToLink] = useState<any>([...form.values.social]);
  const [socialsToUnlink, setSocialsToUnlink] = useState<any>([])
  const redSocial = getSocialNetworkByURL(inputSocialNetwork);
  const alreadyExists = socialsToLink.some((item: SocialNetworkEnum) => item.url === inputSocialNetwork);


  const errorMessage = alreadyExists
    ? "Dirección URL existente"
    : redSocial === "Desconocido"
    ? "URL desconocida"
    : "";

  const onClose = () => {
    setInputSocialNetwork("")
    onRequestClose();
    setSocialsToLink(initialValues)
  };

  const socialsToUpload = (url: SocialNetworkEnum[], socials: any) => {
    if (!socials || !socials.length) return url;
    return url.filter((networks: any) => !socials.map((social: any) => social.url).includes(networks.url));
  }

  const socialsToRemove = (url: SocialNetworkEnum[], socials: any) => {
    return socials.filter((networks: any) => url.includes(networks.url)).map((networks: any) => networks.id);
  }

  const onSaveSocialNetworks = () => {
    notifications.show(NOTIFICATIONS.STORE_UPDATE_PENDING);
    setUpdatingStore(true);
    
    const networks_to_upload = socialsToUpload(socialsToLink, store.social_networks);
    const networks_to_remove = socialsToRemove(socialsToUnlink, store.social_networks);

    if(networks_to_upload.length) {
      stores.addSocialNetworks(store.id, networks_to_upload)
        .then(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_SUCCESS))
        .catch(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_FAILED))
        .finally(() => {
          setUpdatingStore(false);
          onRequestClose();
        });
    }

    if (socialsToUnlink.length) {
      stores.removeSocialNetworks(store.id, networks_to_remove)
        .then(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_SUCCESS))
        .catch(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_FAILED))
        .finally(() => {
          setUpdatingStore(false);
          onRequestClose();
          setSocialsToUnlink([]);
        });
    }

    if(!networks_to_upload.length && !networks_to_remove.length) {
      setUpdatingStore(false);
      onRequestClose();
      setSocialsToUnlink([]);
      notifications.update(NOTIFICATIONS.STORE_UPDATE_SUCCESS)
    }
  };



  const addSocialNetworks = () => {
    if (inputSocialNetwork.trim() !== "" && !alreadyExists) {
      setSocialsToLink([...socialsToLink, {
        url: inputSocialNetwork,
        name: redSocial,
      }]);
      setInputSocialNetwork("")
    }
  }

  const onRemoveNetworks = (url: string) => {
    const filteredPills = socialsToLink.filter((item: SocialNetworkEnum) => item.url !== url);
    setSocialsToLink(filteredPills);
    setSocialsToUnlink([...socialsToUnlink, url]);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Redes Sociales">
      <form onSubmit={form.onSubmit(onSaveSocialNetworks)}>
        <Stack>
          <Group gap={8}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="https://instagram.com/"
              onChange={(event) => setInputSocialNetwork(event.currentTarget.value)}
              value={inputSocialNetwork}
              error={Boolean(inputSocialNetwork.length) && errorMessage}
            />
            <Button onClick={addSocialNetworks} disabled={Boolean(errorMessage)}>
              Añadir
            </Button>
          </Group>
          {socialsToLink.map((item: SocialNetworkEnum) => (
            <Group key={item.url} justify="space-between">
              {SocialNetworkIcon(item.name as SocialNetworks, 22)}
              <Text style={{ flex: 1 }} component="a" href={item.url} fz="xs">{item.url}</Text>
              <ActionIcon size="sm" variant="subtle" onClick={() => onRemoveNetworks(item.url)}>
                <Cross2Icon stroke="1" width={12} />
              </ActionIcon>
            </Group>
          ))}
          <Space h={32} />
          <Button variant="outline" type="submit" loading={updatingStore}>
            Guardar
          </Button>
        </Stack>
        <LoadingOverlay visible={updatingStore} overlayProps={{ blur: 2 }} />
      </form>
    </Modal>
  );
};
