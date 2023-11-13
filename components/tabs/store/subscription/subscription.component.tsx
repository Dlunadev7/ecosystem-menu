import React, { useMemo } from 'react';

import { IconAlertCircle, IconExternalLink } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Alert, Badge, Button, Card, Flex, Skeleton, Space, Tabs, Text, Title } from '@mantine/core';

import { useInvoices, useSubscriptions } from '@/shared/hooks/subscriptions';
import { SubscriptionStatusEnum } from '@ecosystem-ar/sdk';
import { Table } from '@components';

import styles from './subscription.module.scss';

export function SubscriptionTabs({store}: {store: any}) {
  const { subscription, loading_subscription } = useSubscriptions(store.subscription?.id);
  const { invoices, loading_invoices } = useInvoices(store.subscription?.id);

  const InvoicesTableSettings = useMemo(() => [
    { header: 'ID', render: (invoice: any) => <Text size="xs">{invoice.id}</Text> },
    { header: 'Monto', render: (invoice: any) => <Text size="xs">{`${invoice.amount.toFixed(2)} ${invoice.currency}`}</Text> },
    { header: 'Fecha de cobro', render: (invoice: any) => <Text size="xs">{`${dayjs(invoice.debit_date).format('MMM D, YYYY h:mm A') }`}</Text> },
    { 
      header: 'Estado',
      render: (invoice: any) => (
        <Badge
          size="xs"
          color={invoice.status === 'scheduled' ? "orange": "green" }
          variant="light"
        >
          {invoice.status === 'scheduled' ? 'programado' : null}
          {invoice.status === 'approved' ? 'aprobado' : null}
        </Badge>
      )
    },
  ], [invoices])

  return (
    <Tabs.Panel value="subscriptions" pb="xs" className={styles.tab_panel}>
      <Card withBorder padding="lg" radius="sm">
        <Flex
          mih={50}
          gap="md"
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <div>
            <Text size="xs" fw="bolder">Email</Text>
            <Skeleton animate visible={loading_subscription} height={24}>
              <Text size="sm">{!loading_subscription && subscription?.email}</Text>
            </Skeleton>
          </div>
          <div>
            <Text size="xs" fw="bolder">Frecuencia</Text>
            <Text size="sm">Mensual</Text>
          </div>
          <div>
            <Text size="xs" fw="bolder">Costo</Text>
            <Skeleton animate visible={loading_subscription} height={24}>
              <Text size="sm">{!loading_subscription && `${subscription?.settings.amount} ${subscription?.settings.currency}`}</Text>
            </Skeleton>
          </div>
          <div>
            <Text size="xs" fw="bolder">Próximo Cobro</Text>
            <Skeleton animate visible={loading_invoices} height={24}>
              <Text size="sm">
                {
                  !loading_invoices && 
                  invoices.length > 0 && 
                  invoices.find((invoice: any) => invoice.status === 'scheduled') &&
                  `${dayjs(invoices.find((invoice: any) => invoice.status === 'scheduled').debit_date).format('MMM D, YYYY') }` || 
                  `Sin definir.`
                }
              </Text>
            </Skeleton>
          </div>
          <div>
            <Text size="xs" fw="bolder">Estado</Text>
            <Skeleton animate visible={loading_subscription} height={24}>
              <Badge size="xs" color={!loading_subscription && subscription?.status === SubscriptionStatusEnum.ACTIVE ? "green": "orange"} variant="light">
                {!loading_subscription && (
                  <>
                    {subscription?.status === SubscriptionStatusEnum.INACTIVE ? 'Inactiva' : null}
                    {subscription?.status === SubscriptionStatusEnum.ACTIVE ? 'Activa' : null}
                    {subscription?.status === SubscriptionStatusEnum.PENDING ? 'Pendiente' : null}
                    {subscription?.status === SubscriptionStatusEnum.CANCELLED ? 'Cancelada' : null}
                  </>
                )}
              </Badge>
            </Skeleton>
          </div>
        </Flex>
        {subscription?.status === SubscriptionStatusEnum.INACTIVE && (
          <Alert radius="sm" mt="lg" icon={<IconAlertCircle size="1rem" />} title="Retraso en Mercado Pago" color="gray">
            En ocasiones, Mercado Pago puede tener un retraso de hasta 1 hora en notificar cambios de estado en las suscripciones.
            <br></br>
            Si ya activaste tu suscripción, dale a Mercado Pago un tiempito para que nos avise.
          </Alert>
        )}
        {!loading_subscription && subscription?.status === SubscriptionStatusEnum.INACTIVE && (
          <Flex justify="flex-end" mt="lg">
            <Button
              component="a"
              href={subscription.gateway.payment_link}
              leftSection={<IconExternalLink size="0.9rem" />}
              target="_blank"
            >
              Activar Suscripción
            </Button>
          </Flex>
        )}
      </Card>
      <Space h={32} />
      <Title order={2} size="sm"></Title>
      <Space h={8} />
      <Table
        title="Últimos Pagos"
        loading={loading_invoices}
        data={invoices}
        settings={InvoicesTableSettings}
      />
  </Tabs.Panel>
  )
}