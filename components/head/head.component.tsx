import NHead from 'next/head';

import { useTenant } from '@/shared/hooks/tenant';

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
      <title key="title">{title || 'MenuQR - La solución de digital de Ecosystem para tu local'}</title>
      <meta key="charset" charSet="UTF-8" />
      {/* Favicon */}
      <meta key="viewport" name="viewport" content="minimum-scale=1.0, initial-scale=1.0, width=device-width, user-scalable=no" />
      <link key="favicon" rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png"></link>
      <link key="favicon-1" rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png"></link>
      <link key="favicon-2" rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png"></link>
      <link key="manifest" rel="manifest" href="site.webmanifest"></link>
      <link key="mask-icon" rel="mask-icon" href="safari-pinned-tab.svg" color="#242424"></link>
      <meta key="msapplication-config" name="msapplication-TileColor" content="#fafafa"></meta>
      <meta key="theme-color" name="theme-color" content="#fafafa"></meta>

      {/* SEO */}
      <meta key="robots" name="robots" content="index, follow" /> 
      <meta key="description" name="description" content={description || "Optimiza la gestión de tu local con MenuQR de Ecosystem. Toma pedidos, ofrece opciones de Take Away, y más. ¡Regístrate gratis hoy!"} />
      <meta key="keywords" name="keywords" content="MenuQR, Menú Digital, Restaurantes, Ecosystem, Gestión de Menús, Take Away, Reservas en Línea, Gestión de Locales"/>
      <meta key="language" httpEquiv="content-language" content="es-AR" />
      <meta key="tags" name="tags" content="MenuQR, Ecosystem, Menú Digital, Restaurantes, Take Away, Reservas en Línea, Gestión de Locales" />
      <link key="canonical" rel="canonical" href={`https://menu.ecosystem.com.ar${slug ? `/${slug}` : ""}`} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:title" property="og:title" content="MenuQR - La solución digital de Ecosystem para tu local" />
      <meta key="og:description" property="og:description" content={description || "Optimiza la gestión de tu local con MenuQR de Ecosystem. Toma pedidos, ofrece opciones de Take Away, y más. ¡Regístrate gratis hoy!"} />
      <meta key="og:image" property="og:image" content="https://menu.ecosystem.com.ar/ogg.jpg" />
      <meta key="og:url" property="og:url" content={slug ? `https://${host}/${slug}` : "https://menu.ecosystem.com.ar"} />
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:site" name="twitter:site" content="@ecosystem" />
      <meta key="twitter:title" name="twitter:title" content="MenuQR - La solución digital de Ecosystem para tu local" />
      <meta key="twitter:description" name="twitter:description" content={description || "Optimiza la gestión de tu local con MenuQR de Ecosystem. Toma pedidos, ofrece opciones de Take Away, y más. ¡Regístrate gratis hoy!"} />
      <meta key="twitter:image" name="twitter:image" content="https://menu.ecosystem.com.ar/ogg.jpg" />

      {/* Analytics */}

      {analytics && (
        <script
          key="ecosystem-analytics"
          async
          src={process.env.NEXT_PUBLIC_ECOSYSTEM_ANALYTICS_URI}
          data-website-id={analytics}
        />
      )}
    </NHead>
  )
}