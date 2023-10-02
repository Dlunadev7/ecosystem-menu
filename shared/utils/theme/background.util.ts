import { MantineColorScheme, useMantineTheme } from "@mantine/core";

export function BackgroundColor(scheme: MantineColorScheme){
    /**
   * 
   * @todo Revisar todo este codigo.
   */
  const theme = useMantineTheme();

  return scheme === 'light' ? theme.colors.white[0] : theme.colors.dark[7];
}