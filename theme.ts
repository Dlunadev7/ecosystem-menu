import { createTheme } from "@mantine/core";

export const theme = createTheme({
  black: '#242424',
  defaultRadius: "md",
  primaryColor: 'dark',
  components: {
    Container: {
      styles: {
        root: {
          minHeight: '100vh',
          paddingBottom: 200
        }
      }
    }
  }
});
