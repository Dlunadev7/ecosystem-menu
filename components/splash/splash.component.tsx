import { useTenant } from '@/shared/hooks/tenant';
import { RouteEnum } from '@/shared/enums';
import { Button, Image, Space, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';

import styles from './splash.module.scss';

interface SplashProps {
  loading?: boolean,
  unauthorized?: boolean,
  notfound?: boolean,
}

export function Splash({ loading, unauthorized, notfound }: SplashProps) {
  const router = useRouter();
  const { favicon } = useTenant();

  if (loading) return (
    <div className={styles.container}>
      <Image src={favicon} w={36} alt="" />
      <Space h={16} />
      <Text fw="bold" tt="uppercase" c="dimmed" fz="xs">
        cargando
      </Text>
    </div>
  )

  if (unauthorized) {
    return (
      <div className={styles.container}>
        <Title>401</Title>
        <Space h={16} />
        <Text c="dimmed" fz="xs" maw={300} ta="center">
          Parece que no tenés permisos para ver esta página, 
          si crees que es un error, contactate con soporte.
        </Text>
        <Button
          size="xs"
          variant="outline"
          mt="xl"
          onClick={() => router.push(RouteEnum.SIGN_IN)}
        >
          Iniciar sesión
        </Button>
      </div>
    )
  }


  if (notfound) return (
    <div className={styles.container}>
      <Title ta="center">404</Title>
      <Space h={16} />
      <Text color="dimmed" fz="xs" maw={300} ta="center">
        La página que estas búscando no existe, 
        puede que te hayas confundido de dirección o que la página se haya movido a otra URL, 
        si crees que es un error, contactate con soporte.
      </Text>
      <Button 
        size="xs"
        variant="outline"
        mt="xl"
        onClick={() => router.push(RouteEnum.LANDING)}
      >
        Ir al Inicio
      </Button>
    </div>
  );

  return null;
}