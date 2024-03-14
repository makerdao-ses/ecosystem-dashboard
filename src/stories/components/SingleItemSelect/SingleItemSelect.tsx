import styled from '@emotion/styled';
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import merge from 'deepmerge';
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { SelectChevronDown } from '../svg/select-chevron-down';
import type { PaperProps, PopperProps } from '@mui/material';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export interface SelectItem<T = string> {
  label: string;
  value: T;
  labelWhenSelected?: string;
}

interface SingleItemSelectProps {
  // if the menu should be opened by default (mostly for testing)
  defaultOpen?: boolean;
  label?: string;
  useSelectedAsLabel?: boolean;
  items: SelectItem[] | string[];
  PaperProps?: PaperProps;
  PopperProps?: Omit<PopperProps, 'open'>;
  className?: string;
  selected?: string;
  onChange?: (value: string) => unknown;
  isMobile?: boolean;
}

const SingleItemSelect: React.FC<SingleItemSelectProps> = ({
  defaultOpen = false,
  label,
  useSelectedAsLabel,
  items,
  PaperProps,
  PopperProps,
  className,
  selected,
  onChange,
  isMobile = false,
}) => {
  const { isLight } = useThemeContext();
  const menuListId = useId();
  const inputId = useId();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    // note that initializing the open status to `defaultOpen` could
    // introduce issues as the `anchorRef` don't trigger re-renders
    // so the popper is not located properly on the screen
    if (defaultOpen) {
      // open the dropdown, useful for testing purposes
      setOpen(true);
    }
  }, [defaultOpen]);

  // keep a ref to the input so we can position the menu, etc.
  const anchorRef = useRef<HTMLButtonElement>(null);

  // open/close the menu
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // close the menu when clicking away from it or a item is clicked
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  // clone the menu when `Tab` or `Escape` is pressed to keep
  // default standardized browser behavior
  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the input when we transitioned from !open -> open
  const prevOpen = useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // props to be applied to the paper component
  const paperProps = useMemo(() => {
    const defaultProps = {
      square: true,
      elevation: 0,
      sx: {
        width: '200px',
      },
    } as PaperProps;

    return merge(defaultProps, PaperProps ?? {});
  }, [PaperProps]);

  // props to be applied to the Popper component
  const popperProps = useMemo(() => {
    const defaultProps = {
      transition: true,
      disablePortal: true,
      placement: 'bottom-start',
    } as PopperProps;

    return merge(defaultProps, PopperProps ?? {}) as Omit<PopperProps, 'open' | 'anchorEl'>;
  }, [PopperProps]);

  // get the input label
  const inputLabel = useMemo(() => {
    if (useSelectedAsLabel || label === undefined) {
      // the label should change every time the selected value changes
      if (items.length === 0) {
        // there are not items to select
        return label ?? '';
      }

      const index = items.findIndex((item) => compareItemWithValue(item, selected));
      if (index === -1) {
        return label === undefined ? (typeof items[0] === 'string' ? items[0] : items[0].label) : label;
      }

      const item = items[index];
      if (typeof item === 'string') {
        return item;
      } else {
        // Use the labelWhenSelected if its present and its mobile
        if (open && isMobile) {
          return item.labelWhenSelected ? item.labelWhenSelected : item.label;
        }
        return open || !isMobile ? item.label : item.labelWhenSelected || item.label;
      }
    } else {
      return label;
    }
  }, [useSelectedAsLabel, label, items, selected, open, isMobile]);

  return (
    <div>
      <SelectBtn
        ref={anchorRef}
        id={inputId}
        className={className}
        isLight={isLight}
        onClick={handleToggle}
        aria-controls={open ? menuListId : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
      >
        {inputLabel}{' '}
        <ChevronContainer>
          <StyledSelectChevronDown isOpen={open} fill={isLight ? '#231436' : '#E2D8EE'} />
        </ChevronContainer>
      </SelectBtn>
      <Popper open={open} anchorEl={anchorRef.current} style={{ zIndex: 1 }} {...popperProps}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : placement === 'bottom-end' ? 'right top' : 'left bottom',
            }}
          >
            <CustomPaper isLight={isLight} {...paperProps}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id={menuListId} aria-labelledby={inputId} onKeyDown={handleListKeyDown}>
                  <SimpleBar
                    style={{
                      maxHeight: 178,
                    }}
                    className="filter-popup-scroll"
                  >
                    {items.map((item, index) => (
                      <CustomMenuItem
                        selected={compareItemWithValue(item, selected)}
                        isLight={isLight}
                        key={index}
                        onClick={(event: Event | React.SyntheticEvent) => {
                          handleClose(event);
                          onChange?.(typeof item === 'string' ? item : item.value);
                        }}
                      >
                        {typeof item === 'string' ? item : item.label}
                      </CustomMenuItem>
                    ))}
                  </SimpleBar>
                </MenuList>
              </ClickAwayListener>
            </CustomPaper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default SingleItemSelect;

// helpers
const compareItemWithValue = (item: string | SelectItem, value?: string) =>
  typeof item === 'string' ? item === value : item.value === value;

const SelectBtn = styled.button<WithIsLight>(({ isLight }) => ({
  display: 'inline-flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 8,
  color: isLight ? '#231536' : '#E2D8EE',
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 500,
  background: isLight ? '#ffffff' : '#10191F',
  borderRadius: 24,
  border: `1px solid ${isLight ? '#D4D9E1' : '#343442'}`,
  padding: '7px 16px',
  cursor: 'pointer',
  outline: 'none',

  '&:hover': {
    border: `1px solid ${isLight ? '#231536' : '#787A9B'}`,
  },
}));

const ChevronContainer = styled.span({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
});

const StyledSelectChevronDown = styled(SelectChevronDown)<{ isOpen: boolean }>(({ isOpen }) => ({
  transform: isOpen ? 'scaleY(-1)' : 'scaleY(1)',
}));

const CustomPaper = styled(Paper)<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#ffffff' : '#000A13',
  padding: '24px 16px 16px',
  borderRadius: 6,
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.10)',
}));

const CustomMenuItem = styled(MenuItem)<WithIsLight>(({ isLight }) => ({
  borderRadius: 6,
  padding: '12px 4px',
  minHeight: 'auto',
  fontSize: 14,
  lineHeight: 'normal',
  color: isLight ? '#231536' : '#D2D4EF',
  '&:not(:first-of-type)': {
    marginTop: 4,
  },

  '&.Mui-selected': {
    backgroundColor: isLight ? '#EDEFFF' : '#231536',

    '&.Mui-focusVisible': {
      backgroundColor: isLight ? '#EDEFFF' : 'red',
    },
    '&:hover': {
      backgroundColor: isLight ? '#F6F8F9' : '#25273D',
    },
  },

  '&:hover': {
    backgroundColor: isLight ? '#F6F8F9' : '#25273D',
  },
}));
