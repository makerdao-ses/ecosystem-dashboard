
import React from 'react';
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
}

const MdViewerPage = ({ subTitle = 'What we do', paragraphDescription, paragraphImage }: Props) => {
  return (
    <ViewerContainer>
      <TypographyStyleDescription id='hidden-element'>{subTitle}</TypographyStyleDescription>
      {paragraphDescription && <Markdown value={paragraphDescription} renderer={customRenderer} key={paragraphDescription}/>}
      {(paragraphImage !== '![Image]()') &&
        <Markdown value={paragraphImage} renderer={customRenderer} key={paragraphImage}/>
      }
    </ViewerContainer>
  );
};

export default MdViewerPage;

const ViewerContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'justify',
  boxSizing: 'border-box',
});

const TypographyStyleDescription = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '19px',
  color: '#231536',
  marginBottom: '16px'
});
