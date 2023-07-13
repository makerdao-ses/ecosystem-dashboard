import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import type { CuCategoryEnum } from '../../../core/enums/cuCategoryEnum';
import type { CSSProperties } from 'react';

export enum ExtendedActorsCategoryEnum {
  ActiveEcosystemActor = 'ActiveEcosystemActor',
  AdvisoryCouncilMember = 'AdvisoryCouncilMember',
}

export type CombinedActorsCategoryEnum = CuCategoryEnum & ExtendedActorsCategoryEnum;

interface StatusChipProps {
  category: CombinedActorsCategoryEnum | string;
  style?: CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colors: { [id: string]: any } = {
  All: {
    color: '#5D48FF',
    background: '#F7F5FF',
    colorDark: '#5D48FF',
    backgroundDark: '#715fff26',
  },
  Technical: {
    color: '#546978',
    background: 'rgba(246, 245, 255, 0.5)',
    colorDark: '#7D8FAA',
    backgroundDark: '#615eff26',
  },
  Support: {
    color: '#1AAB9B',
    background: 'rgba(245, 255, 246, 0.5)',
    colorDark: '#00ED18',
    backgroundDark: '#5cff6326',
  },
  Operational: {
    color: '#9055AF',
    background: 'rgba(250, 245, 255, 0.5)',
    colorDark: '#8F2EC1',
    backgroundDark: '#8728ff26',
  },
  Business: {
    color: '#F08B04',
    background: 'rgba(255, 251, 245, 0.5)',
    colorDark: '#FF8237',
    backgroundDark: '#ffa23526',
  },
  RWAs: {
    color: '#2DC1B1',
    background: 'rgba(245, 255, 249, 0.5)',
    colorDark: '#02CB9B',
    backgroundDark: '#50ff9626',
  },
  Growth: {
    color: '#DC5D00',
    background: 'rgba(255, 245, 245, 0.5)',
    colorDark: '#EF5277',
    backgroundDark: '#ff565626',
  },
  Finance: {
    color: '#447AFB',
    background: 'rgba(247, 255, 245, 0.52)',
    colorDark: '#34AAFF',
    backgroundDark: '#4992ff26',
  },
  Legal: {
    color: '#5D48FF',
    background: '#F7F5FF',
    colorDark: '#5D48FF',
    backgroundDark: '#54697826',
  },
  ScopeFacilitator: {
    color: '#FF78F2',
    background: '#F7F5FF',
    colorDark: '#FF78F2',
    backgroundDark: '#54697826',
  },
  Default: {
    color: '#546978',
    background: 'rgba(246, 245, 255, 0.5)',
    colorDark: '#546978',
    backgroundDark: '#54697826',
  },
};

export const CategoryChip = (props: StatusChipProps) => {
  const { isLight } = useThemeContext();
  const paletteColor = colors[props.category] ? colors[props.category] : colors.Default;

  return (
    <Chip
      style={{
        color: isLight ? paletteColor.color : paletteColor.colorDark,
        borderColor: isLight ? paletteColor.color : paletteColor.colorDark,
        background: isLight ? paletteColor.background : paletteColor.backgroundDark,
        ...props.style,
      }}
    >
      {props.category}
    </Chip>
  );
};

const Chip = styled.div({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: '11px',
  borderRadius: '12px',
  padding: '4px 8px',
  height: '22px',
  lineHeight: '13px',
  width: 'fit-content',
  border: '1px solid black',
  boxSizing: 'border-box',
  paddingBottom: '2px',
});
