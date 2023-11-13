import { Button, Space, Text, Title } from '@mantine/core';
import { RenderIf } from '../render-if/render-if.component';
import { EmptyStateProps } from './empty-state.interface';
import styles from './empty-state.module.scss';

export function EmptyState(props: EmptyStateProps) {
  const { icon, title, description, action, flat } = props;

  return (
    <div className={`${styles.empty_state} ${flat && styles.flat}`}>
      <span className={styles.icon}>{icon}</span>
      <Title order={3}>{title}</Title>
      <Space h={8} />
      <Text fz="xs" c="dimmed">{description}</Text>
      <RenderIf condition={action}>
        <Button onClick={action?.onClick} disabled={action?.disabled} className={styles.action}>
          {action?.label}
        </Button>
      </RenderIf>
    </div>
  )
}