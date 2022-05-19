
import React, { useEffect, useState } from 'react';
import dompurify from 'dompurify';
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
  const sanitizer = dompurify.sanitize;

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
    <ViewerContainer>
      <TypographyStyleSentence>{title}</TypographyStyleSentence>
        <Markdown value={sentenceDescription} renderer={customRenderer} />
      <TypographyStyleDescription>{subTitle}</TypographyStyleDescription>
      <Markdown value={paragraphDescription} renderer={customRenderer} />
      <Markdown value={paragraphImage} renderer={customRenderer} />
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
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '19px',
  color: '#000000',
  marginBottom: '16px'
});

const TypographyStyleDescription = styled(Typography)({
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '19px',
  color: '#000000',
  marginBottom: '32px',
  marginTop: '32px'
});
