import { styled, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import EmptyMobileDark from 'public/assets/img/empty_comment__mobile--dark.png';
import EmptyMobileLight from 'public/assets/img/empty_comment__mobile--light.png';
import EmptyDesktopDark from 'public/assets/img/empty_comment__small_desktop--dark.png';
import EmptyDesktopLight from 'public/assets/img/empty_comment__small_desktop--light.png';
import EmptyTabletDark from 'public/assets/img/empty_comment__tablet--dark.png';
import EmptyTabletLight from 'public/assets/img/empty_comment__tablet--light.png';
import GenericCommentCard from './GenericCommentCard';
import type { Theme } from '@mui/material';

const NoComments: React.FC = () => {
  const isLight = useTheme().palette.isLight;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  return (
    <GenericCommentCard>
      <Image
        src={
          isMobile
            ? isLight
              ? EmptyMobileLight
              : EmptyMobileDark
            : isTablet
            ? isLight
              ? EmptyTabletLight
              : EmptyTabletDark
            : isLight
            ? EmptyDesktopLight
            : EmptyDesktopDark
        }
        priority={true} // load the image as soon as possible to avoid flickering
        placeholder="blur"
        alt="No comments"
        quality={100} // avoid compression to avoid blurry images
        style={{
          width: '100%',
          height: 150,
        }}
      />
      <Title>No Data Provided</Title>
    </GenericCommentCard>
  );
};

export default NoComments;

const Title = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: 32,
  fontSize: 18,
  fontWeight: 700,
  lineHeight: '120%',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  background: theme.palette.isLight ? 'rgba(255, 255, 255, 0.30)' : 'rgba(37, 42, 52, 0.50)',
  borderRadius: 12,
  whiteSpace: 'nowrap',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
  },
}));
