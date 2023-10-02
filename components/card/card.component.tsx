import { Card as MCard, CardProps } from "@mantine/core";

interface CustomCardProps extends CardProps {
  onClick?: () => void;
}

export function Card({ children, ...props }: CustomCardProps) {
  return (
    <MCard shadow="lg" radius="sm" padding={0} py="lg" px="md" {...props}>
      {children}
    </MCard>
  )
}