import { Flex } from "@mantine/core";

import styles from './toolbar.module.scss';

export function Toolbar({ children }: any) {
  return (
    <Flex gap={16} className={styles.toolbar}>
      {children}
    </Flex>
  )
}