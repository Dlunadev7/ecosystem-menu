import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

export const ConfirmationModal = ({ title, body, onConfirm, onCancel }: { title: string, body: string, onConfirm: () => void, onCancel?: () => void }) => {
  return modals.openConfirmModal({
    title: title,
    children: body && (
      <Text size="sm">
        {body}
      </Text>
    ),
    labels: { confirm: 'Si', cancel: 'Cancelar' },
    onCancel: onCancel,
    onConfirm: onConfirm,
  });
}