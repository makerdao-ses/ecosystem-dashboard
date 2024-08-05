import { styled } from '@mui/material';

interface Props {
  className?: string;
}

const ShadowWrapper: React.FC<React.PropsWithChildren & Props> = ({ children, className }) => (
  <Wrapper className={className}>{children}</Wrapper>
);

export default ShadowWrapper;

const Wrapper = styled('div')(({ theme }) => ({
  filter: theme.palette.isLight
    ? 'drop-shadow(1px 4px 15px rgba(74, 88, 115, 0.25))'
    : 'drop-shadow(1px 4px 15.3px #141921)',
}));
