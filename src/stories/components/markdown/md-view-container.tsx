import React, { useCallback, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

import { marked } from 'marked';

import MdViewerPage, { MarkDownHeaders } from './md-view';
import makerRender from './renderUtils';

const MdViewerContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [markdownText, setMarkdownText] = useState<string>('');
  const [headersLevel, setHeadersLevel] = useState<MarkDownHeaders[]>([]);
  const urlTest = 'https://raw.githubusercontent.com/mact200590/Proyectos/master/example.md';

  useEffect(() => {
    const fetchCreator = async() => {
      try {
        setLoading(true);
        const response = await fetch(urlTest);
        if (!response.ok) {
          console.log('firstError', response.status);
        } else {
          const parsed = await response.text();
          setMarkdownText(marked.parse(parsed));
        }
        setLoading(false);
      } catch (error) {
        console.log('not-found');
      }
    };
    fetchCreator();
  }, []);

  const creatingIndexItems = useCallback(
    (level: number, htmlCleanedText: string, escapedText: string) => {
      const cleanedText = htmlCleanedText
        .replace(/[^a-zA-Z,:" ";?]/g, '')
        .replace(';', '`');

      if (headersLevel.some((a) => a.title === cleanedText)) return;
      setHeadersLevel([
        ...headersLevel,
        {
          level,
          title: cleanedText,
          id: escapedText,
          href: `#${escapedText}`,
        },
      ]);
    },
    [headersLevel],
  );
  marked.use({
    renderer: makerRender({ forEachHeading: creatingIndexItems }),
  });

  if (loading) return <CircularProgress color="inherit" />;

  return (
        <MdViewerPage
            markdownText={markdownText}
            mdUrl={markdownText}
            headersLevel={headersLevel}
        />
  );
};

export default MdViewerContainer;
