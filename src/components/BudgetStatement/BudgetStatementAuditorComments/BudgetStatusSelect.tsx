import { styled } from '@mui/material';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import ExpenseReportStatus from '@/views/CoreUnitBudgetStatement/components/ExpenseReportStatus/ExpenseReportStatus';

export type BudgetStatusSelectProps = {
  availableStatuses?: BudgetStatus[];
  selected?: BudgetStatus;
  onChangeStatus?: (status: BudgetStatus) => void;
};

const BudgetStatusSelect: React.FC<BudgetStatusSelectProps> = ({ availableStatuses, selected, onChangeStatus }) => {
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
    <SelectWrapper ref={menuRef} open={opened} onClick={toggleOpenHandler}>
      <SelectControl>
        <ExpenseReportStatus status={selectedStatus} />
        <Arrow width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.28221 0.229512C0.988881 -0.0765039 0.513315 -0.0765039 0.219992 0.229512C-0.0733308 0.535524 -0.0733308 1.03168 0.219992 1.33769L4.46885 5.77042C4.47802 5.77998 4.48736 5.78924 4.49688 5.79821C4.50402 5.80494 4.51125 5.8115 4.51858 5.8179C4.81368 6.07559 5.25385 6.05979 5.53115 5.77049L9.78002 1.33777C10.0733 1.03175 10.0733 0.535602 9.78002 0.229584C9.48672 -0.076431 9.01112 -0.076431 8.71782 0.229584L5.00004 4.10822L1.28221 0.229512Z"
          />
        </Arrow>
      </SelectControl>
      <Menu open={opened} ref={menuRef}>
        <DropdownLabel>Status</DropdownLabel>

        <OptionsContainer>
          {statuses.map((status) => (
            <MenuItem key={status} onClick={() => selectStatusHandler(status)} selected={status === selectedStatus}>
              <ExpenseReportStatus status={status} />
            </MenuItem>
          ))}
        </OptionsContainer>
      </Menu>
    </SelectWrapper>
  );
};

export default BudgetStatusSelect;

const SelectWrapper = styled('div')<{ open: boolean }>(({ theme, open }) => ({
  position: 'relative',
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  borderRadius: 8,
  padding: '7px 10px 7px 7px',
  minWidth: 'fit-content',
  userSelect: 'none',

  ...(open && {
    border: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
    }`,
    background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
    '& > svg': {
      transform: 'rotate(180deg)',
    },
  }),
}));

const SelectControl = styled('div')({
  cursor: 'pointer',
});

const Arrow = styled('svg')(({ theme }) => ({
  marginLeft: 12,
  marginBottom: 3,

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  },
}));

const Menu = styled('div')<{ open: boolean }>(({ theme, open }) => ({
  position: 'absolute',
  display: open ? 'block' : 'none',
  left: 0,
  top: 'calc(100% + 1px)',
  width: 199,
  padding: 16,
  borderRadius: 12,
  background: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,
}));

const DropdownLabel = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 700,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.slate[600] : theme.palette.colors.slate[50],
  paddingLeft: 8,
  marginBottom: 8,
}));

const OptionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  borderRadius: 12,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(55, 62, 77, 0.30)',
  boxShadow: '0px 0px 17.4px 0px rgba(30, 33, 36, 0.03) inset',
  overflow: 'hidden',
}));

const MenuItem = styled('div')<{ selected: boolean }>(({ theme, selected }) => ({
  position: 'relative',
  borderRadius: 6,
  padding: 8,
  cursor: 'pointer',
  background: selected
    ? theme.palette.isLight
      ? theme.palette.colors.slate[50]
      : 'rgba(37, 42, 52, 0.40)'
    : 'transparent',
}));
