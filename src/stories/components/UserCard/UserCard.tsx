import styled from '@emotion/styled';
import { Divider, useMediaQuery } from '@mui/material';
import request, { ClientError } from 'graphql-request';
import React, { useCallback, useState } from 'react';
import { getColorRole } from '@/core/utils/colors';
import lightTheme from '../../../../styles/theme/themes';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import { useAuthContext } from '../../../core/context/AuthContext';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { ButtonType } from '../../../core/enums/buttonTypeEnum';
import { capitalizeWordWithoutConvertLowerCase, getCorrectRoleApi } from '../../../core/utils/string';
import ControlledSwitches from '../../../views/CoreUnitAbout/components/Button/ControlledSwitches/ControlledSwitches';
import { ENABLE_DISABLE_USER_REQUEST } from '../../containers/Auth/ToggleAccountsActiveFlag/ToggleAccountsActiveFlagAPI';
import { CustomButton } from '../CustomButton/CustomButton';
import AvatarPlaceholder from '../svg/avatar-placeholder';
import type { UserDTO } from '../../../core/models/dto/authDTO';

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
  const { authToken } = useAuthContext();
  const role = getCorrectRoleApi(user);
  const [isChecked, setIsChecked] = useState(checked);
  const { isLight } = useThemeContext();
  const isTable = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const color = getColorRole(user);
  const handleGoProfile = () => {
    handleGoProfileView(id);
  };

  const [isChanging, setIsChanging] = useState<boolean>(false);
  const handleChangeCard = async () => {
    const { query: gqlQuery, input } = ENABLE_DISABLE_USER_REQUEST(!checked, id);
    try {
      setIsChanging(true);
      const data = await request(GRAPHQL_ENDPOINT, gqlQuery, input, { Authorization: `Bearer ${authToken}` });

      if (data) {
        setIsChecked(!isChecked);
      }
    } catch (err) {
      if (err instanceof ClientError) {
        if (err.response.errors && err.response.errors.length > 0 && err.response.errors[0].message) {
          console.error(err);
        }
      }
    } finally {
      setIsChanging(false);
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
          <Label isLight={isLight}>{capitalizeWordWithoutConvertLowerCase(user.username || '')}</Label>
        </PositionRow>
        <PositionRow space="space-between" marginTop={32}>
          <RoleLabel color={isLight ? color.color : color.darkColor}>{role.mainRole}</RoleLabel>
          <CustomButton
            buttonType={ButtonType.Default}
            label="View Profile"
            style={{
              height: 34,
              width: 128,
            }}
            onClick={handleGoProfile}
            allowsHover={!isTable}
          />
        </PositionRow>
      </ContainerInside>
      <Divider
        light
        sx={{
          bgcolor: isLight ? '#D4D9E1' : '#405361',
          marginTop: '32px',
          marginBottom: '16px',
          height: '1px',
        }}
        variant="fullWidth"
      />
      <FooterCard>
        <CustomButton
          buttonType={
            role.mainRole === 'Core Unit Admin' || role.mainRole === 'Site Admin'
              ? ButtonType.Default
              : ButtonType.Danger
          }
          label="Delete"
          style={{
            height: 34,
            width: 92,
          }}
          allowsHover={!isTable}
          onClick={handleOnDeleteAccount}
        />
        <ControlledSwitches
          disabled={isChanging}
          checked={isChecked}
          handleChange={handleChangeCard}
          label="Active"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </FooterCard>
    </Container>
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
  width: 416,
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
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
  wordBreak: 'break-all',
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

const FooterCard = styled.div({
  paddingRight: 16,
  paddingLeft: 16,
  paddingBottom: 16,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export default UserCard;
