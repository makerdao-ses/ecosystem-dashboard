import { ClickAwayListener, Grow, Paper, Popper, styled } from '@mui/material';
import CheckOnComponent from '@ses/components/svg/check-on-new';
import CheckboxOff from '@ses/components/svg/checkbox-off';
import { ThreeDots } from '@ses/components/svg/three-dots';
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
            <CheckOnComponent fill="#25273D" fillDark="#1AAB9B" width={12} height={12} />
          ) : (
            <CheckboxOff fill="#25273D" fillDark="#1AAB9B" width={12} height={12} />
          )}
        </CheckBtn>
        Cumulative{' '}
        <MenuBtn isActive={isCumulative} onClick={handleOpenMenu} ref={anchorRef}>
          <ThreeDots fill={isCumulative ? '#231536' : '#91929D'} height={12} width={3} />
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
  padding: '7px 16px',
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

const MenuBtn = styled('div')<{ isActive: boolean }>(({ isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  cursor: isActive ? 'pointer' : 'auto',
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
  marginRight: -18,
}));

const Divider = styled('div')(({ theme }) => ({
  height: 1,
  width: '100%',
  background: theme.palette.mode === 'light' ? '#D4D9E1' : 'red',
}));
