import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { siteRoutes } from '@/config/routes';
import PlaceholderImgDark from '../../../../public/assets/img/rectangles-dark.png';
import PlaceholderImg from '../../../../public/assets/img/rectangles.png';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { ButtonType } from '../../../core/enums/buttonTypeEnum';
import { CustomButton } from '../CustomButton/CustomButton';

export const ActivityPlaceholder = (props: { hasFilter: boolean; clearAction?: () => void }) => {
  const { isLight } = useThemeContext();
  const router = useRouter();

  const goBack = () => {
    router.push(`${siteRoutes.coreUnitAbout}/${router.query.code}/`);
  };

  return (
    <Container isLight={isLight}>
      <ImageWrapper>
        <Image src={isLight ? PlaceholderImg : PlaceholderImgDark} alt="There are no elements" layout="fill" />
      </ImageWrapper>
      <Title isLight={isLight}>{props.hasFilter ? 'No activity found' : 'No Teams Activity Yet'}</Title>
      <Description isLight={isLight}>
        {props.hasFilter
          ? 'There are no activities that match your search criteria'
          : 'The activity feed for this team is still empty for now. Check back later to see the data once it is submitted.'}
      </Description>
      <ButtonsWrapper>
        {!props.hasFilter && (
          <CustomButton
            onClick={goBack}
            style={{ minWidth: '250px' }}
            label="Go Back"
            buttonType={ButtonType.Secondary}
          />
        )}
        <CustomButton
          style={{ minWidth: '250px' }}
          label="View Active Teams"
          buttonType={ButtonType.Primary}
          onClick={props.clearAction}
        />
      </ButtonsWrapper>
    </Container>
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  border: isLight ? '8px solid #F6F8F9' : '8px solid #10191F',
  background: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #001020 -17.77%, #000000 63.95%)',
  backgroundColor: isLight ? 'none' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '20px',
  height: '100%',
  padding: '64px 32px 32px 32px',
  '@media (min-width: 834px)': {
    height: '768px',
    padding: '64px 0',
  },
}));

const ButtonsWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  marginTop: '54px',
  '@media (min-width: 834px)': {
    flexDirection: 'row',
  },
});

const Title = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  lineHeight: '58px',
  color: isLight ? '#9FAFB9' : '#D1DEE6',
  fontSize: '24px',
  margin: '64px 0 16px',
  textAlign: 'center',
  '@media (min-width: 834px)': {
    fontSize: '48px',
    margin: '48px 0 32px',
    textAlign: 'left',
  },
}));

const Description = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  textAlign: 'center',
  color: isLight ? '#708390' : '#9FAFB9',
  maxWidth: '240px',
  '@media (min-width: 834px)': {
    maxWidth: '520px',
  },
}));

const ImageWrapper = styled.div({
  position: 'relative',
  width: '220px',
  height: '190px',
  '@media (min-width: 834px)': {
    width: '345px',
    height: '332px',
  },
});
