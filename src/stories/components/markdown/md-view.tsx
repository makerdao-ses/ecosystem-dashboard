
import React, { useEffect, useState } from 'react';
import dompurify from 'dompurify';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

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
      <TypographyStyle>{title}</TypographyStyle>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizer(`${sentenceDescription}`) }}
      />
      <TypographyStyle>{subTitle}</TypographyStyle>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizer(`${paragraphDescription}`) }}
      />
      <div
        dangerouslySetInnerHTML={{ __html: sanitizer(`${paragraphImage}`) }}
      />
    </ViewerContainer>
  );
};

export default MdViewerPage;

const ViewerContainer = styled.div`
   display:flex ;
   flex-direction:column;
   background: #F9F9F9;
  text-align: justify;
  padding-top: 11px;
  margin-bottom: 48px;
  box-sizing: border-box;
  padding-left:32px ;
  padding-right:32px ; 
`;

const TypographyStyle = styled(Typography)`
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 19px;
color: #000000;
`;
