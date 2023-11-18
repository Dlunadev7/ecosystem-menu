import { Accordion, AppShell, Button, Flex, Group, Image, List, Stack, Text, ThemeIcon, Title, em } from "@mantine/core";
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { LANDING_TEXT } from "../shared/utils/landing.text";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import { RouteEnum } from "@/shared/enums";
import { Head } from "@components";

export default function LandingPage() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const router = useRouter();
  
  return (
    <AppShell>
      <Head analytics={process.env.NEXT_PUBLIC_ECOSYSTEM_ANALYTICS_ID} />
      <AppShell.Header
        style={{
          backdropFilter: "saturate(180%) blur(5px)",
          backgroundColor: "hsla(0, 0%, 100%, .6)",
          border: 'unset',
          padding: '8px 16px'
        }}
      >
        <Flex maw={980} m="auto" gap="md" justify="space-between" align="center" direction="row">
          <Image maw={100} width="100px" src="/statics/imagotype.svg" alt="" />
          <Group>
            {!isMobile && (
              <Button size="sm" variant="outline" onClick={() => router.push("auth/sign-in")}>
                Ingresa
              </Button>
            )}
            <Link href={"https://linktr.ee/ecosystem.com.ar"} target="_blank">
              <Button
                size="sm"
                rightSection={(
                  <ThemeIcon size="lg">
                    <IconBrandWhatsapp stroke={1} />
                  </ThemeIcon>
                )}
              >
                Contactanos
              </Button>
            </Link>
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Main maw={980} mx="auto" mt={100} px={16}>

        <Flex gap="md" justify="space-between" align="center" direction={isMobile ? "column" : "row"}>
          <Stack align={isMobile ? "center" : "flex-start"} maw={580}>
            <Title ta={isMobile ? "center" : "start"} fz={48}>Tu solución digital</Title>
            <Text ta={isMobile ? "center" : "start"} fz={22}>
              Gestioná tu menú y pedidos desde donde quieras y cuando quieras. La solución definitiva para tu negocio.
            </Text>
            <Button
              mt="lg"
              size="lg"
              rightSection={(
                <ThemeIcon size="lg">
                  <ArrowRightIcon />
                </ThemeIcon>
              )}
              onClick={() => router.push("auth/sign-up")}
            >
              Registrate, es gratis.
            </Button>
          </Stack>
          <Image alt="" maw={300} src="/statics/first_mockup.svg" />
        </Flex>

        <Flex p="lg" py={50} my={100} bg="dark" style={{ borderRadius: 60 }} gap="md" justify="space-between" align="center" direction={isMobile ? "column" : "row"}>
          {!isMobile && (
            <Image alt="" maw={350} src="/statics/second_mockup.svg" />
          )}
          <List withPadding size="md" spacing="md" color="dark" listStyleType="none">
            {LANDING_TEXT.FEATURES.HIGHLIGHT_1.map(({ title, subtitle }) => (
              <List.Item key={title}>
                <Title c="white" order={3}>{title}</Title>
                <Text c="white">
                  {subtitle}
                </Text>
              </List.Item>
            ))}
          </List>
        </Flex>

        <Flex p="lg" py={50} my={100} gap="md" justify="space-between" align="center"  direction={isMobile ? "column" : "row"}>
          <List withPadding size="md" spacing="md" color="dark" listStyleType="none">
            {LANDING_TEXT.FEATURES.HIGHLIGHT_2.map(({ title, subtitle }) => (
              <List.Item key={title}>
                <Title order={3}>{title}</Title>
                <Text>
                  {subtitle}
                </Text>
              </List.Item>
            ))}
          </List>
          {!isMobile && (
            <Image alt="" maw={350} src="/statics/third_mockup.svg" />
          )}
        </Flex>

        <Flex p="lg" py={50} my={100} bg="dark" style={{ borderRadius: 60 }} gap="md" justify="space-between" align="center" direction={isMobile ? "column" : "row"}>
          {!isMobile && (
            <Image alt="" maw={350} src="/statics/fourth_mockup.svg" />
          )}
          <List withPadding size="md" spacing="md" listStyleType="none">
            {LANDING_TEXT.FEATURES.CUSTOMIZATION_INTEGRATIONS.map(({ title, subtitle }) => (
              <List.Item key={title}>
                <Title c="white" order={3}>{title}</Title>
                <Text c="white">
                  {subtitle}
                </Text>
              </List.Item>
            ))}
          </List>
        </Flex>

        <Accordion>
          {LANDING_TEXT.FAQS.map(({ title, content, disabled }) => (
            <Accordion.Item key={title} value={title}>
              <Accordion.Control disabled={disabled}>
                {title}
              </Accordion.Control>
              <Accordion.Panel fz="sm" c="dimmed">
                {content}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

      </AppShell.Main>
      <AppShell.Footer mx="auto" maw={980} mt={100} p={16} withBorder={false} pos="static" style={{borderTop: "1px solid #00000020"}}>
        <Flex
          justify="space-between"
          wrap="wrap"
          columnGap={32}
          rowGap={32}
        >
          <Image
            src="/statics/imagotype.svg"
            width={100}
            height={28}
            alt="ecosystem logo"
          />
          <Flex gap={16} wrap="wrap">
            <Link href={RouteEnum.SIGN_IN}>
              <Text fz="xs">Ingresá</Text>
            </Link>
            <Link href="#">
              <Text fz="xs">{`FAQ\'s`}</Text>
            </Link>
            <Link href={RouteEnum.PRIVACY_POLICIES}>
              <Text fz="xs">Política de privacidad</Text>
            </Link>
            <Link href={RouteEnum.TERMS_AND_CONDITIONS}>
              <Text fz="xs">Términos y condiciones</Text>
            </Link>
          </Flex>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
