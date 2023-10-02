import { RouteEnum } from "@/shared/enums";
import { AppShell, Flex, Text } from "@mantine/core";
import Link from "next/link";

import styles from "./footer.module.scss";
import Image from "next/image";

export function Footer() {

  return (
    <AppShell>
      <AppShell.Footer mx="auto" mt={100} px={16} withBorder={false} pos="static">
        <Flex
          justify="space-between"
          wrap="wrap"
          columnGap={32}
          rowGap={32}
          className={styles.footer}
        >
          <Image
            src="/statics/imagotype.svg"
            width={100}
            height={28}
            alt="ecosystem logo"
            priority
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
