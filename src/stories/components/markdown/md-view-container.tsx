import React, { useCallback, useState } from 'react';
import { marked } from 'marked';

import MdViewerPage, { MarkDownHeaders } from './md-view';
import makerRender from './renderUtils';

interface Props {
  markdown: string;
}

const MdViewerContainer = ({ markdown }: Props) => {
  const [headersLevel, setHeadersLevel] = useState<MarkDownHeaders[]>([]);
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
  const parsed = marked.parse(markdown);
  marked.use({
    renderer: makerRender({ forEachHeading: creatingIndexItems }),
  });
  return (
    <MdViewerPage
      markdownText={parsed}
      headersLevel={headersLevel}
    />
  );
};

export default MdViewerContainer;
