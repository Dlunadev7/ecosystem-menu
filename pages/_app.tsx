import { AppShellProps, MantineProvider } from "@mantine/core";
import { AuthContext } from "@/context/auth/auth.context";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from '@mantine/notifications';
import { ThemeContext, useTheme } from '@/context/theme/theme.context';
import { Head } from '@components';

import '@/styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';


export function App({ Component, pageProps }: any) {
  const { theme } = useTheme();

  return (
    <MantineProvider theme={theme} classNamesPrefix="ecosystem">
      <Head />
      <AuthContext>
        <ModalsProvider>
          <Notifications position="top-right" />
          <Component {...pageProps} />
        </ModalsProvider>
      </AuthContext>
    </MantineProvider>
  );
}

export default function ThemedApp(props: AppShellProps) {
  return (
    <ThemeContext>
      <App {...props} />
    </ThemeContext>  
  )
}

