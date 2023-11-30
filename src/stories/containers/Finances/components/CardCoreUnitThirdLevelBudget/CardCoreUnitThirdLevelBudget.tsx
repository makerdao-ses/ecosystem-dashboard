import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import ArrowOutline from '@ses/components/svg/ArrowOutline';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ReadMore from '../ReadMore';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  image: string;
  code: string;
  name: string;
  href: string;
}

const CardCoreUnitThirdLevelBudget: React.FC<Props> = ({ image, href, code, name }) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  return (
    <Container isLight={isLight}>
      <Avatar>
        <CircleAvatarStyled
          isLight={isLight}
          image={image}
          width={'32px'}
          height="32px"
          name="Core Unit"
          border="none"
        />
      </Avatar>
      <Information>
        <Code isLight={isLight}>{code}</Code>
        <Name isLight={isLight}>{name}</Name>
      </Information>
      <Action>{isMobile ? <ArrowOutline href={href} /> : <ReadMore href={href} />}</Action>
    </Container>
  );
};

export default CardCoreUnitThirdLevelBudget;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px 8px 10px',
  width: 100,
  flex: 1,
  borderRadius: 6,
  background: isLight ? '#FFF' : 'red',
  boxShadow: isLight ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)' : 'red',
  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: 16,
    width: 150,
    minHeight: 173,
  },
}));
const Avatar = styled.div({
  marginBottom: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 16,
  },
});
const CircleAvatarStyled = styled(CircleAvatar)<WithIsLight>(({ isLight }) => ({
  boxShadow: isLight ? '2px 4px 7px 0px rgba(26, 171, 155, 0.25)' : 'red',
}));

const Information = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 2,
  marginBottom: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 23,
    width: 115,
    minHeight: 34,
    gap: 4,
  },
});

const Code = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#9FAFB9' : 'red',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '1px',
  textTransform: 'uppercase',
}));
const Name = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 12,

  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  width: 56,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 89,
  },
}));

const Action = styled.div({});
