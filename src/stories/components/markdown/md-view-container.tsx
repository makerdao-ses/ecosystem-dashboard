import React, { useCallback, useState } from 'react';
import { marked } from 'marked';

import MdViewerPage, { MarkDownHeaders } from './md-view';
import makerRender from './renderUtils';

interface Props {
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
}

const MdViewerContainer = ({ sentenceDescription, paragraphDescription, paragraphImage }: Props) => {
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

  const convertImg = `![Image](${paragraphImage})`;
  const sentence = marked.parse(sentenceDescription);
  const paragraph = marked.parse(paragraphDescription);
  const image = marked.parse(convertImg);
  marked.use({
    renderer: makerRender({ forEachHeading: creatingIndexItems }),
  });
  return (
    <MdViewerPage
      paragraphImage={convertImg}
      sentenceDescription={sentence}
      paragraphDescription={paragraph}
      headersLevel={headersLevel}
    />
  );
};

export default MdViewerContainer;
