import { styled } from '@mui/material';
import { Container } from '@ses/components/SelectItem/SelectItem';
import TokenIcon from '@ses/components/TokenIcon/TokenIcon';
import Check from '@ses/components/svg/check';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import type { SelectItemProps } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { Token } from '@ses/components/TokenIcon/TokenIcon';

const CurrencyItem: React.FC<SelectItemProps> = ({ checked = false, ...props }) => {
  const { isLight } = useThemeContext();

  return (
    <StyledContainer
      className="no-select"
      style={{
        flex: 1,
        minHeight: 40,
        maxHeight: 40,
        padding: 4,
      }}
      checked={checked}
      isLight={isLight}
      onClick={props.onClick}
    >
      {!props.params?.isAll && !props.params?.isAll && <StyledTokenIcon token={props.label as Token} size={32} />}
      <TokenName checked={checked}>{props.label}</TokenName>
      <CheckWrapper>
        <Check fill={checked ? (isLight ? '#231536' : 'white') : isLight ? '#D1DEE6' : '#231536'} />
      </CheckWrapper>
    </StyledContainer>
  );
};

export default CurrencyItem;

const TokenName = styled('span')<{ checked: boolean }>(({ theme, checked = false }) => ({
  fontSize: 14,
  lineHeight: '17px',
  color: theme.palette.isLight ? (checked ? '#231536' : '#231536') : '#D2D4EF',
}));

const CheckWrapper = styled('span')({
  alignSelf: 'center',
  position: 'absolute',
  right: 8,
  top: 8,
});

const StyledContainer = styled(Container)<{ checked: boolean }>(({ theme, checked }) => ({
  '&:hover': {
    background: theme.palette.isLight ? (checked ? '#EDEFFF' : '#F6F8F9') : checked ? '#231536' : '#25273D',
  },
}));

const StyledTokenIcon = styled(TokenIcon)({
  filter: 'filter: drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))',
  marginRight: 16,
});
