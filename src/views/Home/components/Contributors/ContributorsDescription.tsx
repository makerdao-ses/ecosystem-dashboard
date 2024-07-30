import { styled } from '@mui/material';
import Link from 'next/link';
import Arrow from 'public/assets/svg/arrow.svg';
import React from 'react';
import type { FC } from 'react';

interface Props {
  title: string;
  href: string;
  contributors: number;
  description: string;
}

const ContributorsDescription: FC<Props> = ({ title, contributors, href, description }) => (
  <Container href={href}>
    <ContainerTitle>
      {title} ({contributors})
      <LinkArrow>
        <Arrow />
      </LinkArrow>
    </ContainerTitle>
    <Description>{description}</Description>
  </Container>
);

export default ContributorsDescription;

const Container = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const ContainerTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  fontSize: 14,
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],
  lineHeight: '24px',
}));

const LinkArrow = styled('div')(({ theme }) => ({
  display: 'flex',
  width: 24,
  height: 24,
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],
  },
}));

const Description = styled('div')(({ theme }) => ({
  display: 'flex',
  fontSize: 12,
  fontWeight: 500,
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  lineHeight: '18px',
}));
