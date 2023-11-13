import { SkeletonProps, Skeleton } from "@mantine/core";
import { ReactElement } from "react";

interface SkeletonListProps extends SkeletonProps {
  amount: number;
}

export function SkeletonList({ amount, ...props }: SkeletonListProps): ReactElement {
  let elements: ReactElement[] = [];

  for (let index = 0; index < amount; index++) {
    elements.push(<Skeleton key={index} {...props} />)
  }

  return (
    <>
      {elements}
    </>
  );
}