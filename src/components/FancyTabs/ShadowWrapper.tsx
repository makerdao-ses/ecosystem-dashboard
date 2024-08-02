import { styled } from '@mui/material';

const ShadowWrapper: React.FC<React.PropsWithChildren> = ({ children }) => <Wrapper>{children}</Wrapper>;

export default ShadowWrapper;

const Wrapper = styled('div')(({ theme }) => ({
  filter: theme.palette.isLight
    ? 'drop-shadow(1px 4px 15px rgba(74, 88, 115, 0.25))'
    : 'drop-shadow(1px 4px 15.3px #141921)',
}));
