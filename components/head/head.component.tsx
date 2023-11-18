import NHead from 'next/head';

import { useTenant } from '@/shared/hooks/tenant';
import Script from 'next/script';

interface HeadProps {
  title?: string;
  description?: string;
  slug?: string;
  analytics?: string;
}

export function Head(props: HeadProps) {
  const { title = 'Dashboard', description, slug, analytics } = props;

  const { favicon, host, logo } = useTenant();
  
  return (
    <NHead>
      <title>{title || 'MenuQR - La solución de digital de Ecosystem para tu local'}</title>
      <meta charSet="UTF-8" />
      {/* Favicon */}
      <meta name="viewport" content="minimum-scale=1.0, initial-scale=1.0, width=device-width, user-scalable=no" />
      <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png"></link>
      <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png"></link>
      <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png"></link>
      <link rel="manifest" href="site.webmanifest"></link>
      <link rel="mask-icon" href="safari-pinned-tab.svg" color="#242424"></link>
      <meta name="msapplication-TileColor" content="#fafafa"></meta>
      <meta name="theme-color" content="#fafafa"></meta>

      {/* SEO */}
      <meta name="robots" content="index, follow" /> 
      <meta name="description" content={description || "Optimiza la gestión de tu local con MenuQR de Ecosystem. Toma pedidos, ofrece opciones de Take Away, y más. ¡Regístrate gratis hoy!"} />
      <meta name="keywords" content="MenuQR, Menú Digital, Restaurantes, Ecosystem, Gestión de Menús, Take Away, Reservas en Línea, Gestión de Locales"/>
      <meta httpEquiv="content-language" content="es-AR" />
      <meta name="tags" content="MenuQR, Ecosystem, Menú Digital, Restaurantes, Take Away, Reservas en Línea, Gestión de Locales" />
      <link rel="canonical" href="https://menu.ecosystem.com.ar" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="MenuQR - La solución digital de Ecosystem para tu local" />
      <meta property="og:description" content={description || "Optimiza la gestión de tu local con MenuQR de Ecosystem. Toma pedidos, ofrece opciones de Take Away, y más. ¡Regístrate gratis hoy!"} />
      <meta property="og:image" content="https://menu.ecosystem.com.ar/ogg.jpg" />
      <meta property="og:url" content={slug ? `https://${host}/${slug}` : "https://menu.ecosystem.com.ar"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ecosystem" />
      <meta name="twitter:title" content="MenuQR - La solución digital de Ecosystem para tu local" />
      <meta name="twitter:description" content={description || "Optimiza la gestión de tu local con MenuQR de Ecosystem. Toma pedidos, ofrece opciones de Take Away, y más. ¡Regístrate gratis hoy!"} />
      <meta name="twitter:image" content="https://menu.ecosystem.com.ar/ogg.jpg" />

      {/* Analytics */}

      {analytics && (
        <Script
          async
          src={process.env.NEXT_PUBLIC_ECOSYSTEM_ANALYTICS_URI}
          data-website-id={analytics}
          onReady={() => console.log(`tracking site on: ${analytics}`)}
          onError={() => console.log(`Error tracking site on: ${analytics}`)}
        />
      )}
    </NHead>
  )
}