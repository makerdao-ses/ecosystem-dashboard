import React from 'react';
import MdViewerPage from './md-view';

interface Props {
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
}

const MdViewerContainer = ({ sentenceDescription, paragraphDescription, paragraphImage }: Props) => {
  const convertImg = `![Image](${paragraphImage})`;
  return (
    <MdViewerPage
      paragraphImage={convertImg}
      sentenceDescription={sentenceDescription}
      paragraphDescription={paragraphDescription}
    />
  );
};

export default MdViewerContainer;
