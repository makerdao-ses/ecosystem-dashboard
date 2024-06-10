import { styled, useMediaQuery } from '@mui/material';
import ArrowOutline from '@ses/components/svg/ArrowOutline';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';
import ReadMore from '../ReadMore';

interface Props {
  image: string;
  code: string;
  name: string;
  href: string;
}

const CardCoreUnitThirdLevelBudget: React.FC<Props> = ({ image, href, code, name }) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  return (
    <Container>
      <Avatar>
        <CircleAvatarStyled image={image} width={'32px'} height="32px" name="Core Unit" />
      </Avatar>
      <Information>
        <Code>{code}</Code>
        <Name>{name}</Name>
      </Information>
      <Action>{isMobile ? <ArrowOutline href={href} /> : <ReadMore href={href} />}</Action>
    </Container>
  );
};

export default CardCoreUnitThirdLevelBudget;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px 8px 10px',
  width: 100,
  flex: 1,
  borderRadius: 6,
  background: theme.palette.isLight ? '#FFF' : '#1E2C37',
  boxShadow: theme.palette.isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : ' 0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: 16,
    width: 150,
    minHeight: 173,
  },
}));
const Avatar = styled('div')({
  marginBottom: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 16,
  },
});
const CircleAvatarStyled = styled(CircleAvatar)(({ theme }) => ({
  boxShadow: theme.palette.isLight ? '2px 4px 7px 0px rgba(26, 171, 155, 0.25)' : 'none',
  border: 'none',
}));

const Information = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: 2,
  alignItems: 'center',
  marginBottom: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 23,
    width: 115,
    minHeight: 34,
    gap: 4,
  },
});

const Code = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '1px',
  textTransform: 'uppercase',
}));
const Name = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: 100,
  textAlign: 'center',
  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 116,
  },
}));

const Action = styled('div')({});
