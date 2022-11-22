import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useAuthContext } from '../../../core/context/AuthContext';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { ButtonType } from '../../../core/enums/button-type.enum';
import { UserDTO } from '../../../core/models/dto/auth.dto';
import { getColorRole } from '../../../core/utils/color.utils';
import { getCorrectRoleApi } from '../../../core/utils/string.utils';
import { ENABLE_DISABLE_USER_REQUEST } from '../../containers/auth/enable-disable-accounts/enable-disable.api';
import ControlledSwitches from '../button/switch-toogle/switch-component';
import { CustomButton } from '../custom-button/custom-button';
import AvatarPlaceholder from '../svg/avatar-placeholder';

interface Props {
  user: UserDTO;
  checked: boolean;
  id: string;
  handleDeleteAccount?: (id: string) => void;
  handleGoProfileView?: (id: string) => void;
}

const UserCard = ({
  checked,
  user,
  id,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleDeleteAccount = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleGoProfileView = () => {},
}: Props) => {
  const role = getCorrectRoleApi(user);
  const [isChecked, setIsChecked] = useState(checked);
  const { isLight } = useThemeContext();
  const color = getColorRole(user);
  const handleGoProfile = () => {
    handleGoProfileView(id);
  };
  const { clientRequest } = useAuthContext();

  const handleChangeCard = async () => {
    const { query: gqlQuery, input } = ENABLE_DISABLE_USER_REQUEST(!checked, id);
    const data = await clientRequest?.request(gqlQuery, input);
    if (data) {
      setIsChecked(!isChecked);
    }
  };

  const handleOnDeleteAccount = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      handleDeleteAccount(id);
    },
    [handleDeleteAccount, id]
  );

  return (
    <Container isLight={isLight} onClick={handleGoProfile}>
      <ContainerInside>
        <PositionRow alignItems="center">
          <AvatarPlaceholder width={48} height={48} />
          <Label isLight={isLight}>{user.username}</Label>
        </PositionRow>
        <PositionRow space="space-between" marginTop={32}>
          <RoleLabel color={isLight ? color.color : color.darkColor}>{role}</RoleLabel>
          <CustomButton
            label="View Profile"
            style={{
              height: 34,
              width: 128,
            }}
            onClick={handleGoProfile}
          />
        </PositionRow>
      </ContainerInside>
      <Line isLight={isLight} />
      <FooterCard>
        <CustomButton
          buttonType={role === 'Core Unit Admin' || role === 'Site Admin' ? ButtonType.Default : ButtonType.Danger}
          label="Delete"
          style={{
            height: 34,
            width: 92,
          }}
          onClick={handleOnDeleteAccount}
        />
        <ControlledSwitches checked={isChecked} handleChange={handleChangeCard} label="Active" />
      </FooterCard>
    </Container>
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1);',
  borderRadius: '6px',
  width: 416,
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    width: 343,
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: 369,
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    width: 355.33,
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    width: 373.33,
  },

  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    width: 416,
  },
  cursor: 'pointer',
}));
const ContainerInside = styled.div({
  paddingTop: 16,
  paddingRight: 16,
  paddingLeft: 16,
});

const PositionRow = styled.div<{ space?: string; alignItems?: string; marginTop?: number }>(
  ({ space, alignItems, marginTop }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems,
    justifyContent: space,
    marginTop,
  })
);

const Label = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  marginTop: 0,
  marginBottom: 0,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 20,
  lineHeight: '24px',
  letterSpacing: 0.4,
  color: isLight ? '#231536' : '#D2D4EF',
  marginLeft: 16,
}));

const RoleLabel = styled.p<{ color: string }>(({ color }) => ({
  marginTop: 0,
  marginBottom: 0,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 11,
  lineHeight: '13px',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: 4,
  color,
}));

const Line = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  border: isLight ? '1px solid #D4D9E1' : ' 1px solid #405361;',
  width: '100%',
  marginTop: '32px',
  marginBottom: '16px',
}));

const FooterCard = styled.div({
  paddingRight: 16,
  paddingLeft: 16,
  paddingBottom: 16,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export default UserCard;
