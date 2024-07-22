import styled from '@emotion/styled';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChevronDown } from '@ses/components/svg/select-chevron-down';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React, { useEffect } from 'react';
import type { MenuProps } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  items: string[];
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  onOpen?: () => void;
  onClose?: () => void;
  selectedValue: string;
  isOpen: boolean;
  className?: string;
  widthPaper?: number;
  height?: number;
  width?: number;
  borderRadiusPopover?: string;
  menuAnchorOrigin?: MenuProps['anchorOrigin'];
}

/**
 * @deprecated use `SingleItemSelect` instead
 */
const SelectDropdown: React.FC<Props> = ({
  items,
  handleChange,
  selectedValue,
  isOpen,
  onClose,
  onOpen,
  className,
  height = 34,
  width = 92,
  widthPaper = 120,
  borderRadiusPopover = '6px',
  menuAnchorOrigin,
}: Props) => {
  const { isLight } = useThemeContext();

  useEffect(() => {
    // close the menu if it is open
    const handleScroll = () => {
      if (isOpen) {
        onClose?.();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, onClose]);

  return (
    <ContainerSelect className={className}>
      <SelectStyled
        width={width}
        height={height}
        isLight={isLight}
        MenuProps={{
          disableScrollLock: true,
          ...(menuAnchorOrigin && {
            anchorOrigin: menuAnchorOrigin,
          }),
          PaperProps: {
            sx: {
              bgcolor: isLight ? 'white' : '#000A13',
              '&.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
                width: widthPaper,
                borderRadius: borderRadiusPopover,
                padding: '24px 16px 16px',
                '& ul': {
                  padding: 0,
                },
                '& ul > li': {
                  padding: '12px 4px',
                  minHeight: 40,
                },
              },
            },
          },
        }}
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        variant="outlined"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        onChange={handleChange}
        IconComponent={() => (
          <ContainerIcon>
            <StyledSelectChevronDown
              isOpen={isOpen}
              onClick={isOpen ? onClose : onOpen}
              fill={isLight ? '#231436' : '#E2D8EE'}
            />
          </ContainerIcon>
        )}
      >
        {items.map((item) => (
          <MenuItemStyled value={item} key={item} disableTouchRipple={true} isLight={isLight}>
            {item}
          </MenuItemStyled>
        ))}
      </SelectStyled>
    </ContainerSelect>
  );
};

export default SelectDropdown;

const ContainerSelect = styled.div({
  '.MuiSelect-outlined': {
    paddingLeft: 16,
  },
});
const SelectStyled = styled(Select)<WithIsLight & { width: number; height: number }>(({ isLight, height, width }) => ({
  padding: 0,
  borderRadius: 22,
  height,
  width,
  color: isLight ? '#231536' : '#E2D8EE',
  paddingRight: 0,
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '18px',
  marginTop: 1,

  '&.MuiOutlinedInput-root': {
    '& fieldset': {
      border: `1px solid ${isLight ? '#D4D9E1' : '#343442'}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${isLight ? '#231536' : '#787A9B'}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${isLight ? '#231536' : '#787A9B'}`,
    },
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 48,
  },
}));

const MenuItemStyled = styled(MenuItem)<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: 'normal',
  backgroundColor: isLight ? 'white' : '#000A13',

  color: isLight ? '#231536' : '#D2D4EF',

  '& ul > li': {
    margin: 0,
    padding: 0,
    fontSize: 14,
  },

  ':hover': {
    backgroundColor: isLight ? '#EDEFFF' : 'red',
    borderRadius: 6,
  },

  '&.MuiMenuItem-root.Mui-selected': {
    backgroundColor: isLight ? 'white' : '#000A13',
    ':hover': {
      backgroundColor: isLight ? '#EDEFFF' : 'red',
      borderRadius: 6,
    },
  },
}));

const ContainerIcon = styled.div({
  position: 'absolute',
  right: 16,
  marginTop: 2,
  marginRight: -2,
});

const StyledSelectChevronDown = styled(SelectChevronDown)<{ isOpen: boolean }>(({ isOpen }) => ({
  paddingRight: 4,
  transform: isOpen ? 'scaleY(-1)' : 'scaleY(1)',
  width: 16,
  height: 16,
}));
