import { Affix, Button, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";

export function PageUp() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 32, right: 32 }}>
      <Transition transition="slide-up" mounted={scroll.y > 300}>
        {(transitionStyles) => (
          <Button
            style={{ ...transitionStyles, height: 50, width: 50 }}
            radius="100%"
            onClick={() => scrollTo({ y: 0 })}
          >
            <IconArrowUp size="1rem" />
          </Button>
        )}
      </Transition>
    </Affix>
  )
}