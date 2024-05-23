import { ExpandMore, Check } from '@mui/icons-material';
import { Select, MenuItem, FormControl, styled, Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import type { CustomSelectProps } from './type';
import type { SelectChangeEvent, Theme } from '@mui/material';

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  onChange,
  selected,
  customOptionsRender,
  withAll = false,
  customOptionsRenderAll,
  multiple = false,
  style,
}) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value as CustomSelectProps['selected']);
  };

  const renderValue = (selected: unknown) => {
    if (multiple) {
      const selectedOptions = (selected as (string | number)[]).map((value) =>
        options.find((option) => option.value === value)
      );
      if (selectedOptions.length > 1) {
        return `${label} (${selectedOptions.length})`;
      }
      return selectedOptions[0]?.label;
    }
    return options.find((option) => option.value === selected)?.label;
  };

  const isAllSelected = withAll && Array.isArray(selected) && selected.length === options.length;

  const menuProps = StyledMenuProps(theme, style?.menuWidth || 200);

  return (
    <StyledFormControl variant="outlined" fullWidth={style?.fullWidth || false} width={style?.width || 100}>
      <StyledSelect
        multiple={multiple}
        value={selected}
        onChange={handleChange}
        renderValue={renderValue}
        IconComponent={ExpandMore}
        MenuProps={menuProps as object}
      >
        <MenuItemLabel disabled>
          <MenuItemLabelTypography>{typeof label === 'string' ? label : label()}</MenuItemLabelTypography>
        </MenuItemLabel>

        {withAll && (
          <MenuItemDefault
            borderTop={true}
            borderBottom={false}
            value="all"
            onClick={() => onChange(isAllSelected ? [] : options.map((option) => option.value))}
          >
            {customOptionsRenderAll || 'Select All'}
          </MenuItemDefault>
        )}
        {options.map((option, index) => (
          <MenuItemDefault
            borderTop={!withAll && index === 0}
            borderBottom={index === options.length - 1}
            key={option.value}
            value={option.value}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box display="flex" alignItems="center">
              {customOptionsRender ? (
                customOptionsRender(option)
              ) : (
                <MenuItemTypography theme={theme} active={(selected as (string | number)[]).indexOf(option.value) > -1}>
                  {option.label}
                </MenuItemTypography>
              )}
            </Box>
            {!multiple || ((selected as (string | number)[]).indexOf(option.value) > -1 && <CheckIcon />)}
          </MenuItemDefault>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default CustomSelect;

const StyledFormControl = styled(FormControl)(({ fullWidth, width }: { fullWidth: boolean; width: number }) => ({
  width: fullWidth ? '100%' : `${width}px`,
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[800],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.charcoal[700]}`,
  borderRadius: 8,
  color: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.gray[300],
  height: '32px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '& .MuiSelect-icon': {
    color: theme.palette.isLight ? '#404446' : '#EFEFEF',
  },
}));

const MenuItemLabel = styled(MenuItem)({
  minHeight: '12px',
  marginTop: '-40px',
  position: 'absolute',
  top: 0,
  left: 0,
  '&.Mui-disabled': {
    opacity: 1,
  },
});

const MenuItemDefault = styled(MenuItem)(
  ({ borderTop, borderBottom }: { borderTop: boolean; borderBottom: boolean }) => ({
    borderTopLeftRadius: borderTop ? '12px' : 0,
    borderTopRightRadius: borderTop ? '12px' : 0,
    borderBottomLeftRadius: borderBottom ? '12px' : 0,
    borderBottomRightRadius: borderBottom ? '12px' : 0,
    minHeight: '32px',
    margin: '4px 0',
  })
);

const MenuItemTypography = styled(Typography)(({ theme, active }: { theme: Theme; active: boolean }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[600] : theme.palette.colors.gray[50],
  fontSize: '14px',
  fontWeight: active ? 600 : 400,
  lineHeight: '22px',
  marginLeft: '-8px',
}));

const MenuItemLabelTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[600] : theme.palette.colors.slate[50],
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '22px',
  marginLeft: '-8px',
}));

const CheckIcon = styled(Check)(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  width: 16,
  height: 16,
}));

const StyledMenuProps = (theme: Theme, width: number) => ({
  PaperProps: {
    sx: {
      width: `${width}px`,
      color: '#000',
      backgroundImage: 'none',
      bgcolor: theme.palette.isLight ? '#ffffff' : theme.palette.colors.charcoal[900],
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      '&.MuiPaper-elevation.MuiPaper-rounded': {
        borderRadius: '12px',
      },
      '& .MuiMenu-list': {
        position: 'relative',
        borderRadius: '12px',
        bgcolor: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(55, 62, 77, 0.30)',
        margin: '50px 8px 8px',
        padding: 0,
      },
      '& .MuiMenuItem-root': {
        '&.Mui-selected': {
          bgcolor: theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(37, 42, 52, 0.40)',
          '&:hover': {
            bgcolor: theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(37, 42, 52, 0.40)',
          },
        },
        '&:hover': {
          bgcolor: 'transparent',
        },
      },
    },
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  sx: {
    mt: 0.5,
  },
});
