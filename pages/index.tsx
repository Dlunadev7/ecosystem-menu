import { Accordion, AppShell, Button, Flex, Group, Image, List, Stack, Text, ThemeIcon, Title, em } from "@mantine/core";
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { LANDING_TEXT } from "../utils/landing.text";
import { useMediaQuery } from "@mantine/hooks";

export default function LandingPage() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <AppShell>
      <AppShell.Header
        style={{
          backdropFilter: "saturate(180%) blur(5px)",
          backgroundColor: "hsla(0, 0%, 100%, .6)",
          border: 'unset',
          padding: '8px 16px'
        }}
      >
        <Flex maw={980} m="auto" gap="md" justify="space-between" align="center" direction="row">
          <Image maw={100} width="100px" src="https://store-ecosystem.vercel.app/statics/imagotype.svg" alt="" />
          <Group>
            {!isMobile && (
              <Button size="sm" variant="outline">
                Ingresa
              </Button>
            )}
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
            </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Main maw={980} mx="auto" mt={100} px={16}>

        <Flex gap="md" justify="space-between" align="center" direction={isMobile ? "column" : "row"}>
          <Stack align={isMobile ? "center" : "flex-start"} maw={580}>
            <Title ta={isMobile ? "center" : "start"} fz={48}>Tu solución digital</Title>
            <Text ta={isMobile ? "center" : "start"} fz={22}>
              Gestioná tu menú y pedidos desde donde quieras y cuando quieras. La solución definitiva para bares y restaurantes.
            </Text>
            <Button
              mt="lg"
              size="lg"
              rightSection={(
                <ThemeIcon size="lg">
                  <ArrowRightIcon />
                </ThemeIcon>
              )}
            >
              Registrate, es gratis.
            </Button>
          </Stack>
          <Image alt="" maw={300} src="https://nine4-2.vercel.app/images/iPhone-12-Mockup.png" />
        </Flex>

        <Flex p="lg" py={50} my={100} bg="dark" style={{ borderRadius: 60 }} gap="md" justify="space-between" align="center" direction={isMobile ? "column" : "row"}>
          {!isMobile && (
            <Image alt="" maw={300} src="https://nine4-2.vercel.app/images/iPhone-12-Mockup.png" />
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
            <Image alt="" maw={300} src="https://nine4-2.vercel.app/images/iPhone-12-Mockup.png" />
          )}
        </Flex>

        <Flex p="lg" py={50} my={100} bg="dark" style={{ borderRadius: 60 }} gap="md" justify="space-between" align="center" direction={isMobile ? "column" : "row"}>
          {!isMobile && (
            <Image alt="" maw={300} src="https://nine4-2.vercel.app/images/iPhone-12-Mockup.png" />
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
          {LANDING_TEXT.FAQS.map(({ title, content }) => (
            <Accordion.Item key={title} value={title}>
              <Accordion.Control>
                {title}
              </Accordion.Control>
              <Accordion.Panel>{content}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

      </AppShell.Main>
    </AppShell>
  );
}
