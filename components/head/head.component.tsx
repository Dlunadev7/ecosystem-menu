import NHead from 'next/head';

import { useTenant } from '@/shared/hooks/tenant';

export function Head({ title = 'Dashboard', description = "Menú digital.", slug }: any) {
  const { name = "Ecosystem", favicon, host, logo } = useTenant();
  
  return (
    <NHead>
      <title>{`${title} | ${name}`}</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" /> 
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logo} />
      {slug && (
        <meta property="og:url" content={`https://${host}/${slug}`} />
      )}
      <link rel="shortcut icon" href={favicon} />
    </NHead>
  )
}