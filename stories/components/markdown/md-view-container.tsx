import React, { useCallback, useState } from 'react';
import MdViewerPage, { MarkDownHeaders } from './md-view';

interface Props {
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
}

const MdViewerContainer = ({ sentenceDescription, paragraphDescription, paragraphImage }: Props) => {
  const [headersLevel, setHeadersLevel] = useState<MarkDownHeaders[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  return (
    <MdViewerPage
      paragraphImage={convertImg}
      sentenceDescription={sentenceDescription}
      paragraphDescription={paragraphDescription}
      headersLevel={headersLevel}
    />
  );
};

export default MdViewerContainer;
