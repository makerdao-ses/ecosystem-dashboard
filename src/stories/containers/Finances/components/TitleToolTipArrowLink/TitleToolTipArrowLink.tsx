import styled from '@emotion/styled';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import ArrowLink from '@ses/components/svg/ArrowLink';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  title: string;
}

const TitleToolTipArrowLink: React.FC<Props> = ({ title }) => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <Title isLight={isLight}>{title} Reserves </Title>
      <Tooltip>
        <SESTooltip
          content={
            'Customize this chart to display MakerDAO financial data by selecting one or more components from the dropdown, set to "All Components" by default, and choose your preferred granularity(Quarterly, Monthly, Yearly)'
          }
          placement="bottom-start"
          enterTouchDelay={0}
          leaveTouchDelay={15000}
        >
          <IconWrapper>
            <Information />
          </IconWrapper>
        </SESTooltip>
      </Tooltip>
      <ArrowLinkWrapper>
        <ArrowLink />
      </ArrowLinkWrapper>
    </Container>
  );
};

export default TitleToolTipArrowLink;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  alignItems: 'center',
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontFamily: 'Inter, sans-serif',
  fontSize: 18,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '0.75px',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    letterSpacing: '0.4px',
  },
}));

const Tooltip = styled.div({});
const IconWrapper = styled.div({
  display: 'flex',

  paddingTop: 2,
  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingTop: 4,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingTop: 8,
  },
});

const ArrowLinkWrapper = styled.div({
  width: 24,
  height: 24,
  paddingTop: 2,
  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingTop: 3,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingTop: 8,
  },
});
