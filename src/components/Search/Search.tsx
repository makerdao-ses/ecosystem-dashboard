import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import Magnifier from 'public/assets/svg/magnifying.svg';
import React from 'react';
import type { WithLegacyBreakpoints } from '@ses/core/utils/typesHelpers';

interface SearchInputProps extends Partial<WithLegacyBreakpoints> {
  value?: string;
  defaultValue?: string;
  placeholder: string;
  onChange?: (text: string) => void;

  inputRef?: React.RefObject<HTMLInputElement>;
  small?: boolean;
  className?: string;
}

const Search: React.FC<SearchInputProps> = ({
  value,
  defaultValue,
  placeholder,
  onChange,

  inputRef,
  small,
  legacyBreakpoints = true,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };

  return (
    <Container className={className}>
      <InputWrapper>
        <IconWrapper>
          <Magnifier />
        </IconWrapper>

        <Input
          legacyBreakpoints={legacyBreakpoints}
          ref={inputRef}
          id="search-input"
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          small={small}
          autoComplete="off"
        />
      </InputWrapper>
    </Container>
  );
};

export default Search;

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 10,
});

const InputWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: 'min(100%, 290px)',
});

const Input = styled('input')<{ small?: boolean } & WithLegacyBreakpoints>(({ theme, small, legacyBreakpoints }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 16,
  flex: 1,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[300],
  outline: 'none',
  width: '100%',
  lineHeight: '24px',
  border: 'none',
  borderRadius: 8,
  padding: '4px 12px 4px 40px',
  boxSizing: 'border-box',
  transition: 'all .3s ease',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : '#21262F',
  '&::placeholder': {
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[300],
  },

  [lightTheme.breakpoints.up(legacyBreakpoints ? 'table_834' : 'tablet_768')]: !small
    ? {
        backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900],
        width: '320px',
        fontSize: '14px',
      }
    : undefined,
}));
const IconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 12,
  display: 'flex',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[200],
  width: 15,
  height: 15,
}));
