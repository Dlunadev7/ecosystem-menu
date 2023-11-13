import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import {
  ActionIcon,
  AppShell,
  Badge,
  Button,
  Card,
  Container,
  Flex,
  Image,
  Loader,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import Link from "next/link";

import { useAuth } from "@/context/auth/auth.context";
import { CreateStoreModal, EmptyState, Head, Header, Splash, Table, Toolbar } from "@components";
import { useUserStores } from "@/shared/hooks/stores";
import { RouteEnum } from "@/shared/enums";
import { useTenant } from "@/shared/hooks/tenant";
import { RandomAvatar } from "@/shared/utils/avatars";
import { NOTIFICATIONS } from "@/shared/constants/notifications";

import { GRID_BREAKPOINTS } from "@/shared/constants/grid-breakpoints";
import { Emoji } from "@/components/emojis/Emoji";
import { EmojiTags } from "@/shared/utils/emoji";
import { useUserInvitations } from "@/shared/hooks/invitations";
import { InvitationEntity, StoreEntity } from "@ecosystem-ar/sdk";

import styles from '../../styles/global.module.scss';
import { IconBan, IconCheck } from "@tabler/icons-react";
import { useSDK } from "@/shared/api";

export default function DashboardScreen() {
  const router = useRouter();
  const tenant = useTenant();
  const { token, logged, loading, user, login } = useAuth();
  const { user_stores, refetch_user_stores, loading_user_stores } = useUserStores(token);
  const { loading_invitations, invitations, refetch_invitations } = useUserInvitations(user?.id);
  const { users } = useSDK();
  
  const [createStore, setCreateStore] = useState(false);
  const [loadingAcceptance, setLoadingAcceptance] = useState(false);

  const invitationTally = invitations.filter((invitation: InvitationEntity) => {
    const dateOfExpiration = dayjs(invitation.created_at).add(7, 'day');
    return !invitation.accepted && dayjs().isBefore(dateOfExpiration) && !invitation.deleted_at;
  }).length;
  

  const onAcceptInvitation = (invitation: InvitationEntity) => {
    notifications.show(NOTIFICATIONS.ACCEPT_INVITATION_PENDING);
    setLoadingAcceptance(true);

    users.acceptInvitation(invitation.guest.id, invitation.target.id)
      .then(() => {
        refetch_invitations();
        setTimeout(() => {
          notifications.update(NOTIFICATIONS.ACCEPT_INVITATION_SUCCESS);
          refetch_user_stores();
        }, 1000 * 2)
      })
      .catch(() => notifications.update(NOTIFICATIONS.ACCEPT_INVITATION_FAILED))
      .finally(() => setLoadingAcceptance(false));
  }

  useEffect(() => {
    invitations.forEach((invitation) => {
      const dateOfExpiration = dayjs(invitation.created_at).add(7).format();
      const validateDateOfExpiration = dayjs().isAfter(dateOfExpiration, "day");

      if (invitation.accepted === undefined && !validateDateOfExpiration && !Boolean(invitation.deleted_at)) {
        notifications.show({
          id: invitation.id,
          title: 'Invitación pendiente',
          message: `Tenes una invitación pendiente, podes aceptarla hasta el ${dayjs(invitation.created_at).add(7, 'days').format('MMM D, YYYY h:mm A')}`,
          autoClose: false,
        })
      }
    })
  }, [invitations])


  const InvitationsTableSettings = useMemo(() => [
    { header: 'Remitente', render: (invitation: InvitationEntity) => <Text size="xs" tt="capitalize">{`${invitation.host.first_name} ${invitation.host.last_name}`}</Text> },
    { header: 'Tienda', render: (invitation: InvitationEntity) => <Text size="xs" tt="capitalize">{`${invitation.target.name}`}</Text> },
    { header: 'Rol', render: (invitation: InvitationEntity) => <Badge size="sm" variant="outline">{invitation.role}</Badge> },
    {
      header: 'Fecha de expiración',
      render: (invitation: InvitationEntity) => <Text size="xs">{`${dayjs(invitation.created_at).add(7, 'day').format('MMM D, YYYY h:mm A') }`}</Text>,
    },
    {
      header: 'Estado',
      render: (invitation: InvitationEntity) => {
        const { accepted } = invitation;

        const dateOfExpiration = dayjs(invitation.created_at).add(7).format();
        const validateDateOfExpiration = dayjs().isAfter(dateOfExpiration, "day");

        const color = accepted === undefined ? 'orange' : accepted ? 'green' : 'red';
        let label = accepted === undefined ? 'PENDIENTE' : accepted ? 'ACEPTADA' : 'RECHAZADA';
        
        if(!accepted && validateDateOfExpiration) {
          label = 'EXPIRADO'
        };

        return !invitation.deleted_at ? <Badge color={color} variant="light">{label}</Badge> : <Badge size="sm" color="gray" variant="light">CANCELADA</Badge>
      },
    },
    {
      header: '',
      render: (invitation: InvitationEntity) => {
        const { accepted, deleted_at } = invitation;
        const dateOfExpiration = dayjs(invitation.created_at).add(7).format();
        const validateDateOfExpiration = dayjs().isAfter(dateOfExpiration, "day");

        let Icon = (accepted === undefined || accepted) ? <IconCheck color={!validateDateOfExpiration ? "green" : "gray"} size={24} stroke={1} /> : <IconBan size={24} stroke={1} />
        const IconWithLoader = loadingAcceptance ? <Loader /> : Icon;
        
        return (
          <ActionIcon variant="transparent"  size="xs" onClick={() => onAcceptInvitation(invitation)} disabled={accepted !== undefined || validateDateOfExpiration || Boolean(deleted_at)}>
            {IconWithLoader}
          </ActionIcon>
        )
      }
    }
  ], [invitations, loadingAcceptance])
  
  if (loading || !logged) return <Splash loading={loading} unauthorized={!logged} />;
  
  return (
    <Container fluid>
      <Head title="Dashboard" />
      <Header />

      <Tabs defaultValue="stores">
        <Tabs.List h={50}>
          <Tabs.Tab value="stores">Tiendas</Tabs.Tab>
          <Tabs.Tab
            value="invitations"
            rightSection={loading_invitations ?
              <Loader size={16} /> :
              (<Badge w={16} h={16} variant="filled" size="xs" p={0}>
                {invitationTally}
              </Badge>)}
            >
              Invitaciones
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="stores" pb="xs" className={styles.tab_panel}>
          <Toolbar>
            <Button onClick={() => setCreateStore(true)}>
              Nueva Tienda
            </Button>
          </Toolbar>

          <SimpleGrid pt={16} cols={{base: 1, sm: 2,  md: 3}} spacing="sm">
            {user_stores && user_stores.map((store: StoreEntity) => {
              return (
                <Card
                  key={store.id}
                  withBorder
                  onClick={store.verified ? () => router.push(`${RouteEnum.DASHBOARD}/${store.slug}`) : () => notifications.show(NOTIFICATIONS.STORE_PENDING_VALIDATION)}
                  style={{ cursor: store.verified ? 'pointer' : 'not-allowed' }}
                >
                  <Flex gap={16}>
                    <Image
                      src={store.avatar?.uri || RandomAvatar(store.name)}
                      alt={`${store.name} logo`}
                      w={50}
                      h={50}
                      radius={50}
                    />
                    <Stack align="flex-start" gap={8} style={{ width: '100%' }}>
                      <Text fz="sm" fw="bold" tt="capitalize" maw="100%">
                        {store.name}
                      </Text>
                      <Text c="dimmed" size="xs">{store.email}</Text>
                      <Link target="_blank" href={`https://${tenant.host}/${store.slug}`} onClick={(e) => e.stopPropagation()}>
                        <Text size="xs">
                          Visitar sitio
                        </Text>
                      </Link>
                      <Badge variant="dot" color={store.verified ? 'green' : 'orange'} maw={120}>
                        {store.verified ? 'Verificada' : 'En revisión'}
                      </Badge>
                    </Stack>
                  </Flex>
                </Card>
              )
            })}
          </SimpleGrid>
          {!loading_user_stores && !user_stores && (
            <EmptyState
              title="Parece que no tenés tiendas"
              description="Creá tu primera tienda y cargá tus productos"
              icon={<Emoji tag={EmojiTags.ANGUISHED_FACE} />}
            />
          )}
        </Tabs.Panel>

        <Tabs.Panel value="invitations" className={styles.tab_panel}>
          <Table title="Invitaciones Recibidas" data={invitations} settings={InvitationsTableSettings} loading={loading_invitations} />
        </Tabs.Panel>
      </Tabs>
      <CreateStoreModal open={createStore} onClose={() => setCreateStore(false)} />
    </Container>
  )
}