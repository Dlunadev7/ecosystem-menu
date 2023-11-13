import { MantineColorScheme, useMantineTheme } from "@mantine/core";

export function BackgroundColor(scheme: MantineColorScheme = 'light'){
  const theme = useMantineTheme();

  return scheme === 'light' ? theme.white : theme.colors.dark[7];
}