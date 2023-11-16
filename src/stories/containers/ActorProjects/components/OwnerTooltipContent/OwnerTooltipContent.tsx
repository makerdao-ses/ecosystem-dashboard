import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import React from 'react';
import type { Owner } from '@ses/core/models/interfaces/projects';

interface OwnerTooltipContentProps {
  title: string;
  items: Owner[];
}
const OwnerTooltipContent: React.FC<OwnerTooltipContentProps> = ({ title, items }) => (
  <TooltipContainer>
    <TooltipTitle>{title}</TooltipTitle>
    {items.map((item) => (
      <Item key={item.id}>
        <ItemAvatar src={item.imgUrl} />
        <ItemName>{item.name}</ItemName>
      </Item>
    ))}
  </TooltipContainer>
);

export default OwnerTooltipContent;

const TooltipContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const TooltipTitle = styled.div({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: 'normal',
  letterSpacing: 0.3,
});

const Item = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

const ItemAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  border: `2px solid ${'#fff'}`,
  boxShadow: '2px 4px 7px 0px rgba(26, 171, 155, 0.25)',
});

const ItemName = styled.div({
  fontSize: 16,
  lineHeight: '22px',
  letterSpacing: 0.3,
});
