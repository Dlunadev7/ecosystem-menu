import { ActionIcon, NumberInput } from "@mantine/core";
import { useCounter } from "@mantine/hooks";
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

type CounterProps = {
  value: number;
  onChange: (value: number) => void;
  trash?: boolean;
}

export function Counter({ value, onChange, trash }: CounterProps) {
  const [count, handlers] = useCounter(value, { min: 1, max: 10 });

  const onIncrement = () => {
    handlers.increment();
  }

  const onDecrement = () => {
    handlers.decrement();
  }

  const onRemove = () => {
    onChange(0);
  }

  useEffect(() => {
    if (count !== value) onChange(count);
  }, [count]);

  const trashable = trash && count === 1;

  return (
    <ActionIcon.Group>
      <ActionIcon size={30} variant="outline" onClick={trashable ? onRemove : onDecrement}>
        {trashable ? <TrashIcon /> : <MinusIcon />}
      </ActionIcon>
      <NumberInput
        clampBehavior="none"
        value={count}
        onChange={handlers.set}
        min={1}
        max={10}
        hideControls
        w={50}
        size="xs"
        radius={0}
        disabled
        styles={{
          input: {
            textAlign: "center",
            backgroundColor: "unset",
            opacity: 1,
            padding: 0,
          }
        }}
      />
      <ActionIcon size={30} variant="outline" onClick={onIncrement}>
        <PlusIcon />
      </ActionIcon>
    </ActionIcon.Group>
  )
}