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
            <Information height={18} width={18} />
          </IconWrapper>
        </SESTooltip>
      </Tooltip>
      <ArrowLinkWrapper>
        <ArrowLink width={22} height={22} fill={isLight ? '#B6BCC2' : '#787A9B'} />
      </ArrowLinkWrapper>
    </Container>
  );
};

export default TitleToolTipArrowLink;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 6,
  },
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
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

const Tooltip = styled.div({
  display: 'flex',
  justifyContent: 'center',
});
const IconWrapper = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  width: 24,
  height: 24,
  paddingLeft: 2,
  marginTop: 2,
  alignItems: 'flex-start',
  [lightTheme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 4,
  },
});

const ArrowLinkWrapper = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  width: 22,
  height: 22,
  marginBottom: 4,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 'revert',
    marginLeft: 2,
    alignItems: 'baseline',
  },
});
