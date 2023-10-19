import React, { useState } from "react";
import {
  Button,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  Pill,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSDK } from "@/shared/api";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { getSocialNetworkByURL } from "@/shared/helpers/getSocialNetworkByURL";
import { SocialNetwork as SocialNetworkEnum } from "@ecosystem-ar/sdk";
import { notifications } from "@mantine/notifications";

export const SocialNetwork = ({ opened, onRequestClose, store }: any) => {
  const { stores } = useSDK();
  const [updatingStore, setUpdatingStore] = useState(false);
  
  const form = useForm({
    initialValues: {
      social:  store?.social_networks,
    },
  });

  const [inputSocialNetwork, setInputSocialNetwork] = useState("");
  const [items, setItems] = useState<any>([...form.values.social]);

  const redSocial = getSocialNetworkByURL(inputSocialNetwork);
  const alreadyExists = items.some((item: SocialNetworkEnum) => item.url === inputSocialNetwork);

  const errorMessage = alreadyExists
    ? "Dirección URL existente"
    : redSocial === "Desconocido"
    ? "URL desconocida"
    : "";

  const onClose = () => {
    setInputSocialNetwork("")
    onRequestClose();
  };

  const onStoreUpdate = () => {
    notifications.show(NOTIFICATIONS.STORE_UPDATE_PENDING);
    setUpdatingStore(true);
    stores.update(store.id, { social_networks: items as SocialNetworkEnum[] })
      .then(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_SUCCESS))
      .catch(() => notifications.update(NOTIFICATIONS.STORE_UPDATE_FAILED))
      .finally(() => {
        setUpdatingStore(false);
        onRequestClose();
      });
  };

  const onRemoves = (name: string) => {
    const filteredPills = items.filter((item: SocialNetworkEnum) => item.name !== name);
    setItems(filteredPills);
  };

  const SocialNetworkPills = items.map((item: SocialNetworkEnum, index: string) => (
    <Pill
      key={`social-network-${item.name}`}
      id={index}
      withRemoveButton
      onRemove={() => onRemoves(item.name)}
      size="md"
      style={{ justifyContent: "space-between" }}
    >
      {item.url}
    </Pill>
  ));
  
  const addSocialNetwork = () => {
    if (inputSocialNetwork.trim() !== "" && !alreadyExists) {
      setItems([...items, {
        url: inputSocialNetwork,
        name: redSocial,
        id: redSocial,
      }]);
      setInputSocialNetwork("")
      form.reset();
    }
    
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Redes Sociales">
      <form onSubmit={form.onSubmit(onStoreUpdate)}>
        <Stack>
          <Flex align="flex-start" gap={8}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="https://www.instagram.com/"
              onChange={(event) => setInputSocialNetwork(event.currentTarget.value)}
              value={inputSocialNetwork}
              error={Boolean(inputSocialNetwork.length) && errorMessage}
            />
            <Button onClick={addSocialNetwork} disabled={Boolean(errorMessage)}>
              Añadir
            </Button>
          </Flex>
          <Pill.Group style={{flexDirection: "column"}}>{SocialNetworkPills}</Pill.Group>
          <Group justify="flex-end">
            <Button variant="outline" type="submit" loading={updatingStore}>
              Guardar
            </Button>
          </Group>
        </Stack>
        <LoadingOverlay visible={updatingStore} overlayProps={{ blur: 2 }} />
      </form>
    </Modal>
  );
};
