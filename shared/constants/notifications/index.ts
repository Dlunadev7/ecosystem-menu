import { NotificationProps } from "@mantine/notifications"
import { STORE } from "./store";
import { AUTH } from "./auth";
import { INVITATION } from "./invitation";
import { PRODUCT } from "./product";
import { CATEGORY } from "./category";

type NotificationType = {
  [index: string]: NotificationProps & { id: string };
}

export const NOTIFICATIONS: NotificationType = {
  ...STORE,
  ...AUTH,
  ...INVITATION,
  ...PRODUCT,
  ...CATEGORY,
}