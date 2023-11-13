import { useAuth } from "@/context/auth/auth.context";
import { useTenant } from "@/shared/hooks/tenant";
import { RouteEnum } from "@/shared/enums";
import { Center, Flex, Group, AppShell, Image, NavLink } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconChevronLeft, IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/router";

export function Header({ allowBack }: { allowBack?: Boolean }) {
  const router = useRouter();
  const { width } = useViewportSize();

  const { logout } = useAuth();
  const tenant = useTenant();

  const isTablet = width > 620;

  const onRequestLogout = () => {
    router.replace(RouteEnum.SIGN_IN);
    setTimeout(() => logout(), 1000);
  };

  return (
    <AppShell mb={60}>
      <AppShell.Header h={60} style={{ borderBottom: 0 }}>
        <Group grow>
          <Flex>
            {allowBack ? (
              <NavLink
                label={isTablet && "Atrás"}
                leftSection={<IconChevronLeft size="24px" stroke={1.5} />}
                onClick={() => router.back()}
                maw={150}
              />
            ) : (
              <div />
            )}
          </Flex>
          <Center h={60}>
            <Image src={tenant.logo} alt="" w={100} />
          </Center>
          <Flex justify="flex-end" align="center">
            <NavLink
              label={isTablet && "Cerrar Sesión"}
              rightSection={<IconLogout size="24px" stroke={1.5} />}
              disableRightSectionRotation
              onClick={onRequestLogout}
              maw={150}
            />
          </Flex>
        </Group>
      </AppShell.Header>
    </AppShell>
  );
}
