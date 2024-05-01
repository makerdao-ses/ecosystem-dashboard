import { styled } from '@mui/material';
import SectionHeader from '../SectionHeader/SectionHeader';

const LatestUpdatesSection: React.FC = () => (
  <Content id="section-latest-updates">
    <SectionHeader
      title="Latest Updates"
      subtitle="MakerDAO’s Endgame is transforming to enhance growth, resilience, and accessibility, aiming to expand the Dai supply significantly. It introduces sustainable yield farming through SubDAO tokens, creating a dynamic and adaptable ecosystem. The plan includes launching new tokens, enhancing user experience with a new website and app, and initiating a Lockstake Engine for governance engagement."
    />
  </Content>
);

export default LatestUpdatesSection;

const Content = styled('section')(({ theme }) => ({
  marginTop: 32,
  scrollMarginTop: 130,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 40,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 64,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    marginTop: 32,
  },
}));
