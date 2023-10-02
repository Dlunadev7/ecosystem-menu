import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Button,
  Card,
  Container,
  Group,
  Image,
  LoadingOverlay,
  Mark,
  PinInput,
  Stack,
  Stepper,
  Text,
  TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { Head, Splash } from "@/components";
import { RouteEnum } from "@/shared/enums";
import { useAuth } from "@/context/auth/auth.context";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { useTenant } from "@/shared/hooks/tenant";

import styles from '../../styles/auth.module.scss';
import { VerificationStatus } from "@/shared/constants/verification-status";
import { useSDK } from "@/shared/api";

export default function SigninScreen() {

  /**
   * 
   * @todo Revisar todo nuevamente que funcione bien!
   */

  const router = useRouter();
  const tenant = useTenant();

  const { login, loading } = useAuth();
  const { users } = useSDK();
  
  const [loadingSignin, setLoadingSignin] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const authentication_form = useForm({
    initialValues: { email: '' },
  })
  const authorization_form = useForm({
    initialValues: { code: '' }
  })


  const onAuthentication = (values: { email: string }) => {

    setLoadingSignin(true);
    users.authenticate(values.email)
      .then(() => setActiveStep(1))
      .catch(() => notifications.show(NOTIFICATIONS.LOGIN_FAILED))
      .finally(() => setLoadingSignin(false));
  }

  const onAuthorization = (values: { code: string }) => {
    setLoadingSignin(true);

    notifications.show(NOTIFICATIONS.SIGN_IN_PENDING);
    users.authorize(values.code)
      .then(() => {
        notifications.update(NOTIFICATIONS.SIGN_IN_SUCCESS);
        router.replace(RouteEnum.DASHBOARD);
      })
      .catch(() => notifications.update(NOTIFICATIONS.SIGN_IN_FAILED))
      .finally(() => setLoadingSignin(false));
  }

  useEffect(() => {
    switch (router.query.verification) {
      case VerificationStatus.SUCCESS:
        login(router.query.token as string);
        notifications.show(NOTIFICATIONS.VERIFICATION_SUCCESS);
        router.replace(RouteEnum.DASHBOARD);
        break;
      case VerificationStatus.FAILED:
        notifications.show(NOTIFICATIONS.VERIFICATION_FAILED)
        break;
      default:
        break;
    }
  }, [router.query])

  if (loading) {
    return <Splash loading={loading} />;
  }

  return (
    <Container className={styles.container}>
      <Head title="Login" />
      <Image mb={32} w={100} m="auto" alt="logo" src={tenant.logo} />
      <Card className={styles.form_card}>
        <Stepper active={activeStep} wrap={true}>
          <Stepper.Step mb="lg" label="Solicitá acceso" description="Ingresá tu email">
            <form onSubmit={authentication_form.onSubmit(onAuthentication)}>
              <TextInput
                withAsterisk
                label="Email"
                placeholder="john.doe@gmail.com"
                required
                {...authentication_form.getInputProps('email')}
              />
              <Button mt={32} fullWidth type="submit">Siguiente</Button>
            </form>
          </Stepper.Step>
          <Stepper.Step mb="lg" label="Ingresá" description="Ingresá el codigo recibido">
            <form onSubmit={authorization_form.onSubmit(onAuthorization)}>
              <Group justify="center">
                <Stack align="center">
                  <Text>Código de seguridad</Text>
                  <Text fz={12} ta="center">
                    Ingresá el código de seguridad que enviamos a <Mark color="blue">{authentication_form.getInputProps('email').value}</Mark>
                  </Text>
                  <PinInput
                    onChange={(value) => authorization_form.setFieldValue('code', value)}
                    type="number"
                    length={6}
                  />
                </Stack>
              </Group>
              <Button
                mt={32}
                fullWidth
                type="submit"
                disabled={authorization_form.getInputProps('code').value.length < 6}
              >
                Listo
              </Button>
            </form>
          </Stepper.Step>
        </Stepper>
        <Stack mt={64} gap="xs" align="center">
          <Text fz="xs" c="dimmed">¿Todavía no tenés cuenta?</Text>
          <Link href={RouteEnum.SIGN_UP}>
            <Text fz="sm">Registrate</Text>
          </Link>
        </Stack>
        <LoadingOverlay visible={loadingSignin} overlayProps={{blur: 2}} />
      </Card>
    </Container>
  )
}