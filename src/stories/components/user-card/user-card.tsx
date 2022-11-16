import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { ButtonType } from '../../../core/enums/button-type.enum';
import { RoleEnum } from '../../../core/enums/role.enum';
import { getColorRole } from '../../../core/utils/color.utils';
import ControlledSwitches from '../button/switch-toogle/switch-component';
import { CustomButton } from '../custom-button/custom-button';
import AvatarPlaceholder from '../svg/avatar-placeholder';

interface Props {
  role: RoleEnum;
  user: string;
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteAccount?: () => void;
  handleViewProfile?: () => void;
}

const UserCard = ({
  role,
  checked,
  handleChange,
  user,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleDeleteAccount = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleViewProfile = () => {},
}: Props) => {
  const { isLight } = useThemeContext();
  const color = getColorRole(role);
  return (
    <Container isLight={isLight}>
      <ContainerInside>
        <PositionRow alignItems="center">
          <AvatarPlaceholder width={48} height={48} />
          <Label>{user}</Label>
        </PositionRow>
        <PositionRow space="space-between" marginTop={32}>
          <RoleLabel color={isLight ? color.color : color.darkColor}>{role}</RoleLabel>
          <CustomButton
            label="View Profile"
            style={{
              height: 34,
              width: 128,
            }}
            onClick={handleViewProfile}
          />
        </PositionRow>
      </ContainerInside>
      <Line isLight={isLight} />
      <FooterCard>
        <CustomButton
          buttonType={
            role === RoleEnum.CoreUnitAdmin || role === RoleEnum.SiteAdmin ? ButtonType.Default : ButtonType.Danger
          }
          label="Delete"
          style={{
            height: 34,
            width: 92,
          }}
          onClick={handleDeleteAccount}
        />
        <ControlledSwitches checked={checked} handleChange={handleChange} label="Active" />
      </FooterCard>
    </Container>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Container = styled.div<{ isLight?: boolean }>((isLight) => ({
  background: '#FFFFFF',
  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
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

const Label = styled.p({
  marginTop: 0,
  marginBottom: 0,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 20,
  lineHeight: '24px',
  letterSpacing: 0.4,
  color: '#231536',
  marginLeft: 16,
});

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
