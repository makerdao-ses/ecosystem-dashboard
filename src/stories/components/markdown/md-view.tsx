
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Markdown from 'marked-react';
import { customRenderer } from './renderUtils';

export type MarkDownHeaders = {
  level: number;
  title: string;
  id: string;
  href: string;
};

interface Props {
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
  title?: string;
  subTitle?: string;
  headersLevel: MarkDownHeaders[];
}

const MdViewerPage = ({ title = 'About the Core Unit', subTitle = 'What we do', sentenceDescription, paragraphDescription, paragraphImage, headersLevel }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const ids = headersLevel.map((header) => header.id);
    const linkRefs = ids.map((id) => document.querySelector(`a[href='#${id}']`));

    const onScroll = () => {
      let lastScrolledLink = linkRefs[0];

      linkRefs.forEach((link) => {
        if (link) {
          const topPosition = link.getBoundingClientRect().top;
          if (topPosition <= 20) {
            lastScrolledLink = link;
          }
        }
      });

      if (lastScrolledLink) {
        setActiveLink(lastScrolledLink.id);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <ViewerContainer key={sentenceDescription}>
      <TypographyStyleSentence>{title}</TypographyStyleSentence>
        <Markdown value={sentenceDescription} renderer={customRenderer} key={sentenceDescription}/>
      <TypographyStyleDescription>{subTitle}</TypographyStyleDescription>
      <Markdown value={paragraphDescription} renderer={customRenderer} key={paragraphDescription}/>
      <Markdown value={paragraphImage} renderer={customRenderer} key={paragraphImage}/>
    </ViewerContainer>
  );
};

export default MdViewerPage;

const ViewerContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#F9F9F9',
  textAlign: 'justify',
  paddingTop: '11px',
  marginBottom: '48px',
  boxSizing: 'border-box',
  paddingLeft: '32px',
  paddingRight: '32px'
});

const TypographyStyleSentence = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontsize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: '#000000',
});

const TypographyStyleDescription = styled(Typography)({
  fontFamily: 'FT Base ,sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: '#000000',
});
