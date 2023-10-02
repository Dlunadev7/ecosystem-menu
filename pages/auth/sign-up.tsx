import Link from "next/link";
import { useState } from "react";
import {
  Button,
  Card,
  Container,
  Group,
  Image,
  LoadingOverlay,
  Mark,
  Stack,
  Stepper,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { Head, Splash } from "@components";
import { RouteEnum } from "@/shared/enums";
import { NOTIFICATIONS } from "@/shared/constants/notifications";
import { useTenant } from "@/shared/hooks/tenant";

import styles from '../../styles/auth.module.scss';
import { useAuth } from "@/context/auth/auth.context";
import { Emoji } from "@/components/emojis/Emoji";
import { EmojiTags } from "@/shared/utils/emoji";
import { useSDK } from "@/shared/api";

export default function SignupScreen() {
  /**
   * 
   * @todo Verificar que todo funcione bien!
   */
  const tenant = useTenant();
  const { loading } = useAuth();
  const { users } = useSDK();

  const [loadingSignup, setLoadingSignup] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  const signup_form = useForm({
    initialValues: { email: '', first_name: '', last_name: '' },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalido'),
    },
  });

  const onSignup = () => {
    setLoadingSignup(true);

    users.create(signup_form.values)
      .then(() => setActiveStep(1))
      .catch(() => notifications.show(NOTIFICATIONS.SIGN_UP_FAILED))
      .finally(() => setLoadingSignup(false))
  }

  if (loading) {
    return <Splash loading={loading} />;
  }

  return (
    <Container className={styles.container}>
      <Head title="Signup" />
      <Image mb={32} w={100} m="auto" alt="logo" src={tenant.logo} />
      <Card className={styles.form_card}>
        <Stepper active={activeStep}>
          <Stepper.Step mb="lg" label="Registro" description="Ingresá tus datos">
            <form onSubmit={signup_form.onSubmit(onSignup)}>
              <Group grow>
                <TextInput
                  w="50%"
                  withAsterisk
                  label="Nombre"
                  placeholder="John"
                  required
                  {...signup_form.getInputProps('first_name')}
                />
                <TextInput
                  w="50%"
                  withAsterisk
                  label="Apellido"
                  placeholder="Doe"
                  required
                  {...signup_form.getInputProps('last_name')}
                />
              </Group>

              <TextInput
                withAsterisk
                label="Email"
                placeholder="john.doe@gmail.com"
                mt="md"
                {...signup_form.getInputProps('email')}
              />

              <Button mt={32} fullWidth type="submit">Listo</Button>
            </form>
          </Stepper.Step>
          <Stepper.Step mb="lg" label="Verificación" description="Verificá tu email">
            <Stack align="center">
              <Title>
                Épico {" "}
                <Emoji tag={EmojiTags.SMILING_FACE_WITH_SUNGLASSES} width={40} height={40} />
              </Title>
              <Title order={2} ta="center">Tu cuenta fue creada con éxito</Title>
              <Text ta="center">
                Te mandamos un link al email <Mark color="blue">{signup_form.getInputProps('email').value}</Mark> para que puedas validar tu cuenta y empezar a usar la plataforma.
              </Text>
            </Stack>
          </Stepper.Step>
        </Stepper>
        <Stack mt={64} gap="xs" align="center">
          <Text fz="xs" c="dimmed">¿Ya tenés cuenta?</Text>
          <Link href={RouteEnum.SIGN_IN}>
            <Text fz="sm">Ingresá</Text>
          </Link>
        </Stack>
        <LoadingOverlay visible={loadingSignup} overlayProps={{blur: 2}}  />
      </Card>
    </Container>
  )
}