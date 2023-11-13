import { Affix, Button, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";

export function PageUp({ right = 32 }) {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 32, right }}>
      <Transition transition="slide-up" mounted={scroll.y > 300}>
        {(transitionStyles) => (
          <Button
            style={{ ...transitionStyles, height: 50, width: 50, padding: 0 }}
            radius="100%"
            onClick={() => scrollTo({ y: 0 })}
          >
            <IconArrowUp size={24} stroke={1} />
          </Button>
        )}
      </Transition>
    </Affix>
  )
}