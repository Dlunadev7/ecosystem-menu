import { NotificationData, NotificationsProps } from "@mantine/notifications"
import { STORE } from "./store";
import { AUTH } from "./auth";
import { INVITATION } from "./invitation";
import { PRODUCT } from "./product";
import { CATEGORY } from "./category";

interface EcosystemNotification extends Omit<NotificationsProps, 'autoClose'> {
  id: string;
  autoClose?: boolean | number;
}

type NotificationType = {
  [index: string]: EcosystemNotification;
}

const _NOTIFICATIONS: NotificationType = {
  ...STORE,
  ...AUTH,
  ...INVITATION,
  ...PRODUCT,
  ...CATEGORY,
}

export const NOTIFICATIONS = _NOTIFICATIONS as { [index: string]: NotificationData };