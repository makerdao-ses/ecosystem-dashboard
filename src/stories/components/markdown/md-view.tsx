/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Popover, useMediaQuery } from '@mui/material';
import Markdown from 'marked-react';
import { customRenderer, customRendererDark } from './renderUtils';
import { CustomButton } from '../custom-button/custom-button';
import { useThemeContext } from '../../../core/context/ThemeContext';
import lightTheme from '../../../../styles/theme/light';
import CardExpenses from '../card-navegation/card-expenses';
import { formatCode } from '../../../core/utils/string.utils';
import { useRouter } from 'next/router';

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
  headersLevel: MarkDownHeaders[];
  showButton?: boolean;
  onClickFinances: () => void;
  onClickActivity: () => void;
}

const MdViewerPage = ({
  subTitle = 'What we do',
  paragraphDescription,
  paragraphImage,
  headersLevel,
  showButton = false,
  onClickActivity,
  onClickFinances,
}: Props) => {
  const router = useRouter();
  const code = router.query?.code as string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeLink, setActiveLink] = useState('');
  const isLight = useThemeContext().themeMode === 'light';
  const isTable834 = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
  }, [headersLevel]);
  return (
    <ViewerContainer>
      {showButton && !isTable834 ? (
        <ContainerResponsive>
          <TypographyStyleDescription isLight={isLight}>{subTitle}</TypographyStyleDescription>

          <CustomButton
            widthText="100%"
            label="Expenses"
            style={{
              textAlign: 'center',
              border: isLight ? (open ? '1px solid #1AAB9B' : '1px solid #25273D') : '1px solid #25273D',
              background: isLight ? (open ? '#E7FCFA' : 'transparent') : 'transparent',
              borderRadius: '22px',
              height: '34px',
              fontFamily: 'Inter, sans-serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              width: 'fit-content',
              padding: '8px 24px',
            }}
            onClick={handleClick}
            styleText={{
              color: isLight ? (open ? '#1aab9b' : '#231536') : '#D2D4EF',
            }}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <CardExpenses
              onClickActivity={onClickActivity}
              onClickFinances={onClickFinances}
              code={formatCode(code)}
              isTitlePresent={false}
            />
          </Popover>
        </ContainerResponsive>
      ) : showButton && isTable834 ? (
        <div>
          <CardExpenses
            onClickActivity={onClickActivity}
            onClickFinances={onClickFinances}
            code="SES"
            isTitlePresent={false}
            style={{
              width: '335px',
              float: 'right',
              marginLeft: '16px',
              marginBottom: '34px',
            }}
          />
          <TypographyStyleDescription isLight={isLight}>{subTitle}</TypographyStyleDescription>
          {paragraphDescription && isLight ? (
            <Markdown value={paragraphDescription} renderer={customRenderer} key={paragraphDescription} />
          ) : (
            <Markdown value={paragraphDescription} renderer={customRendererDark} key={paragraphDescription} />
          )}
        </div>
      ) : (
        <TypographyStyleDescription isLight={isLight}>{subTitle}</TypographyStyleDescription>
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

const ViewerContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'justify',
  boxSizing: 'border-box',
});

const TypographyStyleDescription = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: isLight ? '19px' : '24px',
  color: isLight ? '#231536' : ' #D2D4EF',
  margin: '0px',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: '16px',
  },
}));

const ContainerResponsive = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});
