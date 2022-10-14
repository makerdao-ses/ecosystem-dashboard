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
import { ButtonType } from '../../../core/enums/button-type.enum';

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
  code: string;
}

const MdViewerPage = ({
  subTitle = 'What we do',
  paragraphDescription,
  paragraphImage,
  headersLevel,
  showButton = false,
  onClickActivity,
  onClickFinances,
  code,
}: Props) => {
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
            buttonType={!open ? ButtonType.Primary : ButtonType.PrimaryMobile}
            widthText="100%"
            label="Expenses"
            style={{
              textAlign: 'center',
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
            sx={{
              '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
                borderRadius: '6px',
                backgroundColor: isLight ? 'none' : '#10191F',
                boxShadow: isLight
                  ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
                  : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
              },
            }}
          >
            <CardExpenses
              onClickActivity={onClickActivity}
              onClickFinances={onClickFinances}
              code={code}
              buttonWidth="139.5px"
              isTitlePresent={false}
              style={{
                width: '335px',
              }}
              styleContainer={{
                minHeight: '190px',
                overflowY: 'hidden',
              }}
            />
          </Popover>
        </ContainerResponsive>
      ) : showButton && isTable834 ? (
        <div>
          <CardExpenses
            styleContainer={{
              minHeight: '190px',
            }}
            onClickActivity={onClickActivity}
            onClickFinances={onClickFinances}
            code={code}
            isTitlePresent={false}
            buttonWidth="139.5px"
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
    fontFamily: 'Inter, sans-serif',
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
