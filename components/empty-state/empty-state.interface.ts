import { ReactNode } from "react";

type ActionType = {
  label: string,
  onClick: () => void,
  disabled?: boolean
}

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ActionType
  flat?: boolean
}