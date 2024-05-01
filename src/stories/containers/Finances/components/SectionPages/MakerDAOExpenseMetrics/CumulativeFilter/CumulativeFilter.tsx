import { ClickAwayListener, Grow, Paper, Popper, styled } from '@mui/material';
import CheckOnComponent from '@ses/components/svg/check-on-new';
import CheckboxOff from '@ses/components/svg/checkbox-off';
import { SelectChevronDown } from '@ses/components/svg/select-chevron-down';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useState, useRef } from 'react';
import CumulativeSelectItem from './CumulativeSelectItem';
import type { CumulativeType } from '../useMakerDAOExpenseMetrics';

interface CumulativeFilterProps {
  isCumulative: boolean;
  handleToggleCumulative: () => void;
  cumulativeType: CumulativeType;
  handleChangeCumulativeType: (value: CumulativeType) => void;
}

const CumulativeFilter: React.FC<CumulativeFilterProps> = ({
  isCumulative,
  handleToggleCumulative,
  cumulativeType,
  handleChangeCumulativeType,
}) => {
  const { isLight } = useThemeContext();
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef(null);

  const handleOpenMenu = () => {
    if (isCumulative) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <>
      <SelectBtn>
        <CheckBtn onClick={handleToggleCumulative}>
          {isCumulative ? (
            <CheckOnComponent fill="#25273D" fillDark="#D2D4EF" width={12} height={12} />
          ) : (
            <CheckboxOff fill="#25273D" fillDark="#D2D4EF" width={12} height={12} />
          )}
        </CheckBtn>
        Cumulative{' '}
        <MenuBtn isActive={isCumulative} onClick={handleOpenMenu} ref={anchorRef}>
          <StyledSelectChevronDown
            isOpen={open}
            fill={isLight ? (isCumulative ? '#25273D' : '#BEBFC5') : isCumulative ? '#B7A6CD' : '#48495F'}
          />
        </MenuBtn>
      </SelectBtn>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        style={{ zIndex: 1 }}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : placement === 'bottom-end' ? 'right top' : 'left bottom',
            }}
          >
            <CustomPaper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <div>
                  <CumulativeSelectItem
                    onClick={() => handleChangeCumulativeType('relative')}
                    type="relative"
                    selected={cumulativeType === 'relative'}
                  />
                  <Divider />
                  <CumulativeSelectItem
                    onClick={() => handleChangeCumulativeType('absolute')}
                    type="absolute"
                    selected={cumulativeType === 'absolute'}
                  />
                </div>
              </ClickAwayListener>
            </CustomPaper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default CumulativeFilter;

const SelectBtn = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  color: theme.palette.mode === 'light' ? '#231536' : '#E2D8EE',
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 500,
  background: theme.palette.mode === 'light' ? '#ffffff' : '#10191F',
  borderRadius: 24,
  border: `1px solid ${theme.palette.mode === 'light' ? '#D4D9E1' : '#343442'}`,
  padding: '7px 0 7px 16px',
  outline: 'none',
}));

const CheckBtn = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  cursor: 'pointer',
}));

const MenuBtn = styled('div')<{ isActive: boolean }>(({ isActive, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 18,
  paddingLeft: 11,
  paddingRight: 16,
  cursor: isActive ? 'pointer' : 'auto',
  borderLeft: `1px solid ${theme.palette.mode === 'light' ? '#D4D9E1' : '#787A9B'}`,
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  width: 282,
  background: theme.palette.mode === 'light' ? '#ffffff' : '#000A13',
  borderRadius: 6,
  overflow: 'hidden',
  boxShadow:
    theme.palette.mode === 'light'
      ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
      : '10px 15px 20px 6px rgba(20, 0, 141, 0.10)',
  marginTop: 9,
  // marginRight: -18,
}));

const Divider = styled('div')(() => ({
  height: 1,
  width: '100%',
  background: '#D4D9E1',
}));

const StyledSelectChevronDown = styled(SelectChevronDown)<{ isOpen: boolean }>(({ isOpen }) => ({
  transform: isOpen ? 'scaleY(-1)' : 'scaleY(1)',
}));
