import { styled } from '@mui/material';
import InfoOutlined from 'public/assets/svg/info_outlined.svg';
import SESTooltip from '@/components/SESTooltip/SESTooltip';

type HeaderLevel = 'h1' | 'h2' | 'h3';

interface SectionHeaderProps {
  title: string;
  subtitle: React.ReactNode;
  tooltip?: React.ReactNode;
  level?: HeaderLevel;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, tooltip, level = 'h1' }) => (
  <Header>
    <TitleWrapper>
      <Title level={level} as={level}>
        {title}
      </Title>
      {tooltip && (
        <TooltipWrapper>
          <SESTooltip content={tooltip} placement="bottom-start" enterTouchDelay={0} leaveTouchDelay={15000}>
            <IconWrapper>
              <InfoOutlined width={16} height={16} />
            </IconWrapper>
          </SESTooltip>
        </TooltipWrapper>
      )}
    </TitleWrapper>
    <Subtitle>{subtitle}</Subtitle>
  </Header>
);

export default SectionHeader;

const Header = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('tablet_768')]: {
    width: '100%',
  },
}));

const TitleWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 8,
});

const Title = styled('h2')<{ level: HeaderLevel }>(({ theme, level }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontWeight: 700,
  fontSize: level === 'h1' ? 20 : level === 'h2' ? 18 : 16,
  lineHeight: level === 'h1' ? '24px' : level === 'h2' ? '22px' : '24px',
  margin: 0,
}));

const TooltipWrapper = styled('div')({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 4,
});

const IconWrapper = styled('div')({
  width: 24,
  minWidth: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 8,
  cursor: 'pointer',
});

const Subtitle = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  fontSize: 14,
  lineHeight: '22px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));
