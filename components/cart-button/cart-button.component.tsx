import { Affix, Button, Indicator } from "@mantine/core";
import { IconShoppingBag } from "@tabler/icons-react";

interface CartButtonProps {
  items: number | undefined;
  onClick: () => void;
}
export function CartButton(props: CartButtonProps) {
  const { items, onClick } = props;

  return (
    <Affix position={{ bottom: 32, right: 32 }}>
      <Indicator inline label={items} size={24} withBorder offset={8}>
        <Button
          disabled={!items}
          style={{ height: 50, width: 50, padding: 0 }}
          radius="100%"
          onClick={onClick}
        >
          <IconShoppingBag size={24} stroke={1} />
        </Button>
      </Indicator>
    </Affix>
  )
}