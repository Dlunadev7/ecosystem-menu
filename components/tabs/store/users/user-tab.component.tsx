/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';

import { ActionIcon, Badge, Button, Flex, Loader, Modal, Select, Space, Stack, Tabs, Text, TextInput } from '@mantine/core';
import dayjs from 'dayjs';
import { notifications } from '@mantine/notifications';

import { useAuth } from '@/context/auth/auth.context';
import { useInvitations } from '@/shared/hooks/invitations';
import { useStaff } from '@/shared/hooks/users';
import { IconAt, IconBan, IconTrash } from '@tabler/icons-react';
import { RoleEnum, StaffType, StoreEntity, InvitationEntity, InvitationTargetEnum, UserEntity } from '@ecosystem-ar/sdk';
import { EmptyState, Table } from '@components';
import { Emoji } from '@/components/emojis/Emoji';
import { EmojiTags } from '@/shared/utils/emoji';
import { NOTIFICATIONS } from '@/shared/constants/notifications';
import { ConfirmationModal } from '@/components/modals/confirmation-modal/confirmation-modal.component';

import styles from '../subscription/subscription.module.scss';
import { useSDK } from '@/shared/api';

export function InviteUser({ store, open, onRequestClose }: { store: StoreEntity, open: boolean, onRequestClose: () => void }) {
  const [email, setEmail] = useState('');
  const [searchNotFound, setSearchNotFound] = useState<null | string>(null);
  const [guest, setGuest] = useState<null | UserEntity>(null);
  const [searching, setSearching] = useState(false);
  const [sendingInvitation, setSendingInvitation] = useState(false);
  const { user } = useAuth();
  const { invitations, refetch_invitations } = useInvitations(store.id, user.id as string);
  const { users } = useSDK();

  const onModalClose = () => {
    setSearchNotFound(null);
    setSearching(false);
    setGuest(null);
    setEmail('');
    onRequestClose();
  }

  const onSearchUser = async () => {
    try {
      setSearching(true);
      const _user = await users.findUserByEmail(email);
  
      if (_user.email === user.email) {
        throw new Error("¡No podes invitarte a vos mismo!");
      }
  
      if (invitations.some((item) => item.guest.email === _user.email)) {
        throw new Error("El usuario ya está invitado.");
      }
  
      setSearchNotFound("");
      setGuest(_user);
    } catch (error: any) {
      if (error.message === "¡No podes invitarte a vos mismo!" || error.message === "El usuario ya está invitado.") {
        setSearchNotFound(error.message);
      } else {
        setSearchNotFound("El usuario no existe");
      }
      setGuest(null)
    } finally {
      setSearching(false);
    }
  };

  const onSubmitInvitation = () => {
    setSendingInvitation(true);
    if (!guest) return null;

    const invitation = {
      host: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      guest,
      target: {
        id: store.id,
        name: store.name,
        type: InvitationTargetEnum.STORE
      },
      role: RoleEnum.ADMINISTRATOR,
    }

    users.inviteUserToStore(guest?.id, store.id, invitation)
      .then(() => {
        notifications.show(NOTIFICATIONS.CREATE_INVITATION_SUCCESS);
        refetch_invitations();
        onModalClose();
      })
      .catch(() => {
        notifications.show(NOTIFICATIONS.CREATE_INVITATION_FAILED);
      })
      .finally(() => setSendingInvitation(false))
  }

  return (
    <Modal
      title="Invitar Usuario"
      opened={open}
      onClose={onModalClose}
    >
      <Flex align="flex-start" gap={8}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="juan.perez@example.com"
          onChange={(event) => setEmail(event.currentTarget.value)}
          type="email"
          value={email}
          onFocus={ ()=> setSearchNotFound("") }
          rightSection={searching ? <Loader size="xs" color="dark" /> : <IconAt size={18} color="gray" stroke={1} />}
        />
        <Button onClick={onSearchUser} disabled={searching || !email || !/.+\@.+\..+/.test(email)}>
          Buscar
        </Button>
      </Flex>
      {!guest ? (
        <EmptyState
          flat
          title={searchNotFound ? searchNotFound : "¡Súma colaboradores!"}
          description="Invita a otros usuarios de la plataforma a administrar tu tienda"
          icon={searchNotFound ? <Emoji tag={EmojiTags.PINCHED_FINGERS} /> : <Emoji tag={EmojiTags.WAVING_HAND} />}
        />
      ) : (
        <>
          <Space h={48} />
            <Flex align="flex-end" justify="space-between" px={4} gap={16}>
              <Stack gap={0}>
                <Text size="sm" tt="capitalize">{`${guest.first_name} ${guest.last_name}`}</Text>
                <Text size="xs" c="dimmed">{guest.email}</Text>
              </Stack>
              <Select
                size="xs"
                disabled
                defaultValue="ADMINISTRATOR"
                data={["ADMINISTRATOR"]}
              />
            </Flex>
          <Space h={48} />
        </>
      )}
      <Space h={16} />
      <Flex justify="flex-end" gap={8}>
        <Button variant="subtle" onClick={onModalClose}>
          Cancelar
        </Button>
        <Button onClick={onSubmitInvitation} loading={sendingInvitation} disabled={sendingInvitation || searching || !email || !guest}>
          Enviar Invitación
        </Button>
      </Flex>
    </Modal>
  )
}

export function UsersTab({ store }: { store: StoreEntity }) {
  const { user } = useAuth();
  const { invitations, loading_invitations } = useInvitations(store.id, user.id as string);
  const { staff, loading_staff } = useStaff(store.id);
  const [loadingInvitationCancellation, setLoadingInvitationCancellation] = useState(false);
  const { users } = useSDK();

  const [createInvitation, setCreateInvitation] = useState(false);

  const onCanceInvitationConfirm = (invitation: InvitationEntity) => {
    setLoadingInvitationCancellation(true);
    notifications.show(NOTIFICATIONS.CANCEL_INVITATION_PENDING)
    users.cancelInvitation(invitation.guest.id, invitation.target.id, invitation.id)
      .then(() => notifications.update(NOTIFICATIONS.CANCEL_INVITATION_SUCCESS))
      .catch(() => notifications.update(NOTIFICATIONS.CANCEL_INVITATION_FAILED))
      .finally(() => setLoadingInvitationCancellation(false));
  }

  const onCanceInvitation = (invitation: InvitationEntity) => ConfirmationModal({
    title: "¿Estás seguro?",
    body: `Esta acción no se puede deshacer, si te arrepentís podés volver a invitar a ${invitation.guest.first_name} en cualquier momento.`,
    onConfirm: () => onCanceInvitationConfirm(invitation),
  })

  const StaffTableSettings = useMemo(() => [
    {
      header: 'Nombre',
      render: (data: StaffType) => <Text size="sm" tt="capitalize">{`${data.first_name} ${data.last_name}`}</Text>,
    },
    {
      header: 'Email',
      render: (data: StaffType) => <Text size="sm">{`${data.email}`}</Text>,
    },
    {
      header: 'Rol',
      render: (data: StaffType) => <Badge size="sm" variant="outline">{data.role}</Badge>,
    },
    {
      header: 'Último inicio de sesión',
      render: (data: StaffType) => <Text size="sm">{data.last_login ? `${dayjs(data.last_login).format('MMM D, YYYY h:mm A')}` : 'Sin registro.'}</Text>,
    },
    {
      header: 'Fecha de expiración',
      render: (data: StaffType) => <Text size="sm">{`${dayjs(data.last_login).add(8, 'hours').format('MMM D, YYYY h:mm A') }`}</Text>,
    },
    {
      header: '',
      render: (data: StaffType) => (
        <ActionIcon color="red" size="xs" disabled>
          {/* {!dayjs().isAfter(dayjs(data.last_login).add(8, 'hours'))} */}
          <IconTrash size={24} stroke={1} />
        </ActionIcon>
      ),
    },
  ], [staff]);

  const InvitationsTableSettings = useMemo(() => [
    {
      header: 'Nombre',
      render: (invitation: InvitationEntity) => <Text size="sm" tt="capitalize">{`${invitation.guest.first_name} ${invitation.guest.last_name}`}</Text>,
    },
    {
      header: 'Email',
      render: (invitation: InvitationEntity) => <Text size="sm">{`${invitation.guest.email}`}</Text>,
    },
    {
      header: 'Rol',
      render: (invitation: InvitationEntity) => <Badge size="sm" variant="outline">{invitation.role}</Badge>,
    },
    {
      header: 'Fecha de expiración',
      render: (invitation: InvitationEntity) => <Text size="sm">{`${dayjs(invitation.created_at).add(7, 'day').format('MMM D, YYYY h:mm A') }`}</Text>,
    },
    {
      header: 'Estado',
      render: (invitation: InvitationEntity) => {
        const { accepted } = invitation;

        const color = accepted === undefined ? 'orange' : accepted ? 'green' : 'red';
        const label = accepted === undefined ? 'PENDIENTE' : accepted ? 'ACEPTADA' : 'RECHAZADA'

        return !invitation.deleted_at ? <Badge color={color} variant="light">{label}</Badge> : <Badge size="sm" color="gray" variant="light">CANCELADA</Badge>
      },
    },
    {
      header: '',
      render: (invitation: InvitationEntity) => {
        return !invitation.deleted_at &&  (
          <ActionIcon
            color="red"
            size="xs"
            disabled={Boolean(invitation.accepted)}
            onClick={() => onCanceInvitation(invitation)}
          >
            {loadingInvitationCancellation ? <Loader /> : <IconBan size={24} stroke={1} />}
          </ActionIcon>
        )
      },
    },
  ], [invitations]);

  return (
    <Tabs.Panel value="users" pb="xs" className={styles.tab_panel}>
      <Table title="Miembros del Staff" data={staff} settings={StaffTableSettings} loading={loading_staff} />
      <Space h={64} />
      <Table
        title="Invitaciones"
        rightSection={(
          <Button size="xs" onClick={() => setCreateInvitation(true)}>
            Invitar Usuario
          </Button>
        )}
        data={invitations}
        settings={InvitationsTableSettings}
        loading={loading_invitations}
      />
      <InviteUser store={store} open={createInvitation} onRequestClose={() => setCreateInvitation(false)} />
    </Tabs.Panel>
  )
}