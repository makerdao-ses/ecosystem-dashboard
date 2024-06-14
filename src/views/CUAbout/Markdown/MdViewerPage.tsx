import { styled, useMediaQuery } from '@mui/material';
import Markdown from 'marked-react';
import React from 'react';

import { ResourceType } from '@/core/models/interfaces/types';

import { useThemeContext } from '../../../core/context/ThemeContext';
import CustomSheetFinances from '../CustomSheetFinances';
import CardExpenses from '../NavigationCard/CardExpenses';
import { customRenderer, customRendererDark } from './renderUtils';
import type { AuditorDto } from '../../../core/models/dto/coreUnitDTO';
import type { Theme } from '@mui/material';

export type MarkDownHeaders = {
  level: number;
  title: string;
  id: string;
  href: string;
};

interface Props {
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string | null;
  title?: string;
  subTitle?: string;
  showButton?: boolean;
  code: string;
  shortCode: string;
  auditors: AuditorDto[];
  queryStrings: string;
  budgetPath: string;
  type: ResourceType;
}

const MdViewerPage = ({
  subTitle = 'What we do',
  paragraphDescription,
  paragraphImage,
  showButton = false,
  queryStrings,
  shortCode,
  budgetPath,
  code,
  type,
}: Props) => {
  const { isLight } = useThemeContext();
  const isTable768 = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  return (
    <ViewerContainer>
      {showButton && !isTable768 ? (
        <ContainerResponsive>
          <TypographyStyleDescription>{subTitle}</TypographyStyleDescription>
          <CustomSheetFinances
            budgetPath={budgetPath}
            queryStrings={queryStrings}
            shortCode={shortCode}
            code={code}
            type={type}
          />
        </ContainerResponsive>
      ) : showButton && isTable768 ? (
        <div>
          <CardContainer768>
            <CardExpenses
              resource={ResourceType.CoreUnit}
              queryStrings={queryStrings}
              code={code}
              shortCode={shortCode}
              isTitlePresent
              budgetPath={budgetPath}
              showMakerburnLink={true}
            />
          </CardContainer768>
          <TypographyStyleDescription>{subTitle}</TypographyStyleDescription>
          {paragraphDescription && isLight ? (
            <Markdown value={paragraphDescription} renderer={customRenderer} key={paragraphDescription} />
          ) : (
            <Markdown value={paragraphDescription} renderer={customRendererDark} key={paragraphDescription} />
          )}
        </div>
      ) : (
        <TypographyStyleDescription>{subTitle}</TypographyStyleDescription>
      )}
      {paragraphDescription && isLight ? (
        <Markdown value={paragraphDescription} renderer={customRenderer} key={paragraphDescription} />
      ) : (
        <Markdown value={paragraphDescription} renderer={customRendererDark} key={paragraphDescription} />
      )}
      {paragraphImage &&
        (isLight ? (
          <Markdown value={paragraphImage} renderer={customRenderer} key={paragraphImage} />
        ) : (
          <Markdown value={paragraphImage} renderer={customRenderer} key={paragraphImage} />
        ))}
    </ViewerContainer>
  );
};

export default MdViewerPage;

const ViewerContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'justify',
  boxSizing: 'border-box',
});

const TypographyStyleDescription = styled('p')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: theme.palette.isLight ? '21.6px' : '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  margin: '0px',
  [theme.breakpoints.up('mobile_375')]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: '16px',
  },
}));

const ContainerResponsive = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

const CardContainer768 = styled('div')({
  width: 340,
  float: 'right',
  marginLeft: 16,
  marginBottom: 16,
});
