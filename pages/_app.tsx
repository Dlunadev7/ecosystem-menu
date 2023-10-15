import '@/styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import Head from "next/head";
import { AppShellProps, MantineProvider } from "@mantine/core";
import { AuthContext } from "@/context/auth/auth.context";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from '@mantine/notifications';
import { ThemeContext, useTheme } from '@/context/theme/theme.context';


export function App({ Component, pageProps }: any) {
  const { theme } = useTheme();

  return (
    <MantineProvider theme={theme} >
      <Head>
        <title>
          MenuQR - La solución de digital de Ecosystem para tu local
        </title>
        <meta charSet="UTF-8" />
        {/* Favicon */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        ></link>
        <link rel="manifest" href="site.webmanifest"></link>
        <link
          rel="mask-icon"
          href="safari-pinned-tab.svg"
          color="#242424"
        ></link>
        <meta name="msapplication-TileColor" content="#fafafa"></meta>
        <meta name="theme-color" content="#fafafa"></meta>

        {/* SEO */}
        <meta
          name="description"
          content="Optimiza la gestión de tu local con MenuQR de Ecosystem. Toma pedidos, ofrece opciones de Take Away, y más. ¡Regístrate gratis hoy!"
        />
        <meta
          name="keywords"
          content="MenuQR, Menú Digital, Restaurantes, Ecosystem, Gestión de Menús, Take Away, Reservas en Línea, Gestión de Locales"
        />
        <meta httpEquiv="content-language" content="es-AR" />
        <meta
          name="tags"
          content="MenuQR, Ecosystem, Menú Digital, Restaurantes, Take Away, Reservas en Línea, Gestión de Locales"
        />
        <link rel="canonical" href="https://menu.ecosystem.com.ar" />
        <meta
          property="og:title"
          content="MenuQR - La solución digital de Ecosystem para tu local"
        />
        <meta
          property="og:description"
          content="Optimiza la gestión de tu local con MenuQR de Ecosystem. Toma pedidos, ofrece opciones de Take Away, y más. ¡Regístrate gratis hoy!"
        />
        <meta
          property="og:image"
          content="https://menu.ecosystem.com.ar/ogg.jpg"
        />
        <meta property="og:url" content="https://menu.ecosystem.com.ar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ecosystem" />
        <meta
          name="twitter:title"
          content="MenuQR - La solución digital de Ecosystem para tu local"
        />
        <meta
          name="twitter:description"
          content="Optimiza la gestión de tu local con MenuQR de Ecosystem. Toma pedidos, ofrece opciones de Take Away, y más. ¡Regístrate gratis hoy!"
        />
        <meta
          name="twitter:image"
          content="https://menu.ecosystem.com.ar/ogg.jpg"
        />
      </Head>
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

