import React, { useCallback, useState } from 'react';
import MdViewerPage, { MarkDownHeaders } from './md-view';

interface Props {
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
  showButton?: boolean;
  onClickFinances: () => void;
  onClickActivity: () => void;
}

const MdViewerContainer = ({
  sentenceDescription,
  paragraphDescription,
  paragraphImage,
  showButton,
  onClickActivity,
  onClickFinances,
}: Props) => {
  const [headersLevel, setHeadersLevel] = useState<MarkDownHeaders[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const creatingIndexItems = useCallback(
    (level: number, htmlCleanedText: string, escapedText: string) => {
      const cleanedText = htmlCleanedText.replace(/[^a-zA-Z,:" ";?]/g, '').replace(';', '`');

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
    [headersLevel]
  );

  // eslint-disable-next-line no-extra-boolean-cast
  const convertImg = !!paragraphImage ? `![Image](${paragraphImage})` : null;
  return (
    <MdViewerPage
      paragraphImage={convertImg}
      sentenceDescription={sentenceDescription}
      paragraphDescription={paragraphDescription}
      headersLevel={headersLevel}
      showButton={showButton}
      onClickActivity={onClickActivity}
      onClickFinances={onClickFinances}
    />
  );
};

export default MdViewerContainer;
