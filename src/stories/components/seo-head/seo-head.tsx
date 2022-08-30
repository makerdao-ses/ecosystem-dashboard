import React, { useMemo } from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  favicon?: string;
  image?: string;
  children?: JSX.Element[] | JSX.Element | React.ReactNode;
}

export const SEOHead = ({
  title,
  description,
  favicon,
  image,
  children,
}: SEOProps) => {
  const faviconType = useMemo(() => {
    if (!favicon) {
      return 'image/ico';
    }

    try {
      const end = favicon.substring(favicon.lastIndexOf('.') + 1).toLowerCase();
      switch (end) {
        case 'png':
          return 'image/png';
        case 'gif':
          return 'image/gif';
        case 'jpeg':
        case 'jpg':
          return 'image/jpeg';
        case 'webp':
          return 'image/webp';
        case 'svg':
          return 'image/svg+xml';
      }
    } catch {
      return 'image/ico';
    }
  }, [favicon]);
  return (
    <Head>
      <title>{title}</title>
      <link rel="manifest" key="manifest" href="/manifest.json" />
      <link
        rel="icon"
        key="favicon"
        type={faviconType ?? 'image/ico'}
        href={favicon || '/favicon.ico'}
      />

      <meta name="description" key="description" content={description} />
      <meta name="theme-color" content="#231536"/>
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#231536" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#D2D4EF" />

      {/* OpenGraph https://ogp.me/ */}
      <meta property="og:title" key="og:title" content={title} />
      <meta
        property="og:description"
        key="og:description"
        content={description}
      />
      <meta property="og:site_name" key="og:site_name" content="MakerDAO Ecosystem Performance Dashboard" />
      {image && <meta property="og:image" key="og:image" content={image} />}

      {/* Twitter card */}
      <meta name="twitter:title" key="twitter:title" content={title} />
      <meta
        name="twitter:description"
        key="twitter:description"
        content={description}
      />
      <meta name="twitter:site" key="twitter:site" content="@MakerDAO" />
      {image && (
        <meta name="twitter:image" key="twitter:image" content={image} />
      )}

      {/* extra */}
      <meta
        name="mobile-web-app-capable"
        key="mobile-web-app-capable"
        content="yes"
      />
      <meta
        name="apple-mobile-web-app-capable"
        key="apple-mobile-web-app-capable"
        content="yes"
      />

      {children}
      <meta name="robots" content="index,follow" />
    </Head>
  );
};
