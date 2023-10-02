import { useOs } from "@mantine/hooks";

export function useDevice() {
  const device: string = useOs();
  const isDesktop: boolean = ["macos", "windows", "linux"].includes(device);
  const isMobile: boolean = !isDesktop;

  return {
    isMobile,
    isDesktop,
  };
}
