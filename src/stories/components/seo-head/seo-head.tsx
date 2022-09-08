import React, { useMemo } from 'react';
import Head from 'next/head';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface ImageType {
  src: string;
  width: number;
  height: number;
}

interface SEOProps {
  title: string;
  description: string;
  favicon?: string;
  image?: string | ImageType;
  twitterImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  children?: JSX.Element[] | JSX.Element | React.ReactNode;
}

export const SEOHead = ({
  title,
  description,
  favicon,
  image,
  twitterImage,
  twitterCard,
  children,
}: SEOProps) => {
  const isLight = useThemeContext().themeMode === 'light';
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
      <meta name="theme-color" content={isLight ? '#ffffff' : '#010101'} />
      <link rel="manifest" key="manifest" href="/manifest.json" />
      <link
        rel="icon"
        key="favicon"
        type={faviconType ?? 'image/ico'}
        href={favicon || '/favicon.ico'}
      />

      <meta name="description" key="description" content={description} />
      {/* OpenGraph https://ogp.me/ */}
      <meta property="og:title" key="og:title" content={title} />
      <meta property="og:description" key="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" key="og:site_name" content="MakerDAO Ecosystem Performance Dashboard" />
      {image &&
        (
          typeof image === 'string'
            ? (
              <meta property="og:image" key="og:image" content={image} />
              )
            : (
              <>
                <meta property="og:image" key="og:image" content={image.src} />
                <meta property="og:image:width" key="og:image:width" content={image.width.toString()} />
                <meta property="og:image:height" key="og:image:height" content={image.height.toString()} />
              </>
              )
        )}

      {/* Twitter card */}
      <meta name="twitter:title" key="twitter:title" content={title} />
      <meta name="twitter:card" key="twitter:card" content={twitterCard || 'summary_large_image'} />
      <meta name="twitter:description" key="twitter:description" content={description} />
      <meta name="twitter:site" key="twitter:site" content="@MakerDAO" />
      {twitterImage
        ? (
          <meta name="twitter:image" key="twitter:image" content={twitterImage} />
          )
        : (
            image && <meta name="twitter:image" key="twitter:image" content={typeof image === 'string' ? image : image.src} />
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
