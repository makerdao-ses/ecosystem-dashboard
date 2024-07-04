import styled from '@emotion/styled';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useThemeContext } from '@/core/context/ThemeContext';
import ExpenseReportStatus from '@/views/CoreUnitBudgetStatement/components/ExpenseReportStatus/ExpenseReportStatus';

export type BudgetStatusSelectProps = {
  availableStatuses?: BudgetStatus[];
  selected?: BudgetStatus;
  onChangeStatus?: (status: BudgetStatus) => void;
};

const BudgetStatusSelect: React.FC<BudgetStatusSelectProps> = ({ availableStatuses, selected, onChangeStatus }) => {
  const { isLight } = useThemeContext();
  const menuRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState<boolean>(false);
  const statuses = useMemo<BudgetStatus[]>(() => availableStatuses || Object.values(BudgetStatus), [availableStatuses]);

  const [selectedStatus, setSelectedStatus] = useState<BudgetStatus>(selected || BudgetStatus.Draft);

  // update selectedStatus when the `selected` param changes (Controlled select)
  useEffect(() => {
    if (selected) {
      setSelectedStatus(selected);
    }
  }, [selected]);

  const selectStatusHandler = (status: BudgetStatus) => {
    setSelectedStatus(status);
    onChangeStatus?.(status);
  };

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (opened && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpened(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, opened]);

  const toggleOpenHandler = useCallback(() => {
    setOpened(!opened);
  }, [opened, setOpened]);

  if (availableStatuses?.length === 1) {
    return <ExpenseReportStatus status={availableStatuses[0]} />;
  }

  return (
    <SelectWrapper ref={menuRef} isLight={isLight} open={opened} onClick={toggleOpenHandler}>
      <SelectControl>
        <ExpenseReportStatus status={selectedStatus} />
        <Arrow width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.28221 0.229512C0.988881 -0.0765039 0.513315 -0.0765039 0.219992 0.229512C-0.0733308 0.535524 -0.0733308 1.03168 0.219992 1.33769L4.46885 5.77042C4.47802 5.77998 4.48736 5.78924 4.49688 5.79821C4.50402 5.80494 4.51125 5.8115 4.51858 5.8179C4.81368 6.07559 5.25385 6.05979 5.53115 5.77049L9.78002 1.33777C10.0733 1.03175 10.0733 0.535602 9.78002 0.229584C9.48672 -0.076431 9.01112 -0.076431 8.71782 0.229584L5.00004 4.10822L1.28221 0.229512Z"
            fill={isLight ? '#231536' : '#D2D4EF'}
          />
        </Arrow>
      </SelectControl>
      <Menu isLight={isLight} open={opened} ref={menuRef}>
        {statuses.map((status) => (
          <MenuItem
            key={status}
            isLight={isLight}
            onClick={() => selectStatusHandler(status)}
            selected={status === selectedStatus}
          >
            <ExpenseReportStatus status={status} />
          </MenuItem>
        ))}
      </Menu>
    </SelectWrapper>
  );
};

export default BudgetStatusSelect;

type StyledThemeProps = {
  isLight: boolean;
};

const SelectWrapper = styled.div<StyledThemeProps & { open: boolean }>(({ isLight, open }) => ({
  position: 'relative',
  border: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  borderRadius: 6,
  padding: '7px 10px 7px 7px',
  minWidth: 'fit-content',
  userSelect: 'none',

  ...(open && {
    borderColor: 'transparent',
    background: isLight ? '#EDEFFF' : '#21212B',
    '& > svg': {
      transform: 'rotate(180deg)',
    },
  }),
}));

const SelectControl = styled.div({
  cursor: 'pointer',
});

const Arrow = styled.svg({
  marginLeft: 19,
});

const Menu = styled.div<StyledThemeProps & { open: boolean }>(({ isLight, open }) => ({
  position: 'absolute',
  display: open ? 'block' : 'none',
  left: 0,
  top: '100%',
  padding: 16,
  borderRadius: 6,
  background: isLight ? '#FFFFFF' : '#000A13',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  ...(!isLight && { border: '1px solid #231536' }),
}));

const MenuItem = styled.div<StyledThemeProps & { selected: boolean }>(({ isLight, selected }) => ({
  position: 'relative',
  borderRadius: 6,
  padding: '4px 4px 4px 44px',
  cursor: 'pointer',

  '&:not(:last-child)': {
    marginBottom: 16,
  },

  '&:after': {
    content: '""',
    position: 'absolute',
    left: 7,
    top: 'calc(50% - 5px)',
    width: 10,
    height: 10,
    borderRadius: '50%',
    border: '1px solid #D1DEE6',
  },

  ...(selected && {
    background: isLight ? '#EDEFFF' : '#231536',
    '&:after': {
      content: '""',
      position: 'absolute',
      left: 7,
      top: 'calc(50% - 5px)',
      width: 10,
      height: 10,
      borderRadius: '50%',
      border: `1px solid ${isLight ? '#231536' : '#D2D4EF'}`,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 9,
      top: 'calc(50% - 3px)',
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: isLight ? '#231536' : '#D2D4EF',
    },
  }),
}));
