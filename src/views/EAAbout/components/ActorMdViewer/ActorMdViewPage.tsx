import { Popover, styled, useMediaQuery } from '@mui/material';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import { customRenderer, customRendererDark } from '@ses/components/Markdown/renderUtils';
import CardExpenses from '@ses/components/NavigationCard/CardExpenses';
import CardSomethingWrong from '@ses/components/NavigationCard/CardSomethingWrong';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { ResourceType } from '@ses/core/models/interfaces/types';
import lightTheme from '@ses/styles/theme/themes';
import Markdown from 'marked-react';
import React from 'react';
import ActorNavigationOptions from '../ActorNavigationOptions/ActorNavigationOptions';
import CardProjects from '../CardProjects/CardProjects';
import type { AuditorDto } from '@ses/core/models/dto/coreUnitDTO';

export type MarkDownHeaders = {
  level: number;
  title: string;
  id: string;
  href: string;
};

interface Props {
  sentenceDescription: string;
  paragraphDescription?: string;
  title?: string;
  subTitle?: string;
  showButton?: boolean;
  code: string;
  shortCode: string;
  actorName: string;
  auditors: AuditorDto[];
  queryStrings: string;
  budgetPath: string;
}

const ActorMdViewPage = ({
  subTitle,
  paragraphDescription = '',

  showButton = false,
  queryStrings,
  code,
  actorName,
  shortCode,
  auditors,
  budgetPath,
}: Props) => {
  const { isLight } = useThemeContext();
  const isTable768 = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isPhoneAndTable = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'desktop_1024'));
  const isPhone = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [isEnabled] = useFlagsActive();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <ViewerContainer>
      {showButton && !isTable768 ? (
        <ContainerResponsive>
          <TypographyStyleDescription>{subTitle}</TypographyStyleDescription>
          {isEnabled('FEATURE_TEAM_PROJECTS') ? (
            <ActorNavigationOptions shortCode={shortCode} budgetPath={budgetPath} />
          ) : (
            <>
              <CustomButton
                buttonType={open ? ButtonType.Default : ButtonType.Primary}
                active={open}
                widthText="100%"
                allowsHover={!isPhoneAndTable}
                label="Expenses"
                style={{
                  textAlign: 'center',
                  borderRadius: '22px',
                  height: '34px',
                  fontFamily: 'Inter, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '18px',
                  width: 'fit-content',
                  padding: '8px 24px',
                }}
                onClick={handleClick}
              />

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                sx={{
                  '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
                    borderRadius: '6px',
                    backgroundColor: isLight ? 'none' : '#10191F',
                    boxShadow: isLight
                      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
                      : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
                  },
                }}
              >
                <CardExpenses
                  budgetPath={budgetPath}
                  resource={ResourceType.EcosystemActor}
                  queryStrings={queryStrings}
                  code={code}
                  shortCode={shortCode}
                  auditors={auditors}
                  isTitlePresent={false}
                  style={{
                    width: '335px',
                  }}
                  styleContainer={{
                    minHeight: '190px',
                    overflowY: 'hidden',
                  }}
                  titleCard={`View all expenses of the ${actorName} Ecosystem Actor.`}
                  auditorMessage={`The ${actorName} is working without auditor.`}
                  makerburnCustomMessage={`View On-Chain transfers to ${actorName} on makerburn.com`}
                />
              </Popover>
            </>
          )}
        </ContainerResponsive>
      ) : (
        showButton &&
        isTable768 && (
          <div>
            <CardContainer768>
              {isEnabled('FEATURE_TEAM_PROJECTS') && <CardProjects actorName={actorName} shortCode={shortCode} />}
              <CardExpenses
                resource={ResourceType.EcosystemActor}
                styleContainer={{
                  minHeight: '190px',
                }}
                queryStrings={queryStrings}
                code={code}
                shortCode={shortCode}
                auditors={auditors}
                isTitlePresent={isEnabled('FEATURE_TEAM_PROJECTS')}
                titleCard={`View all expenses of the ${actorName} Ecosystem Actor.`}
                auditorMessage={`The ${actorName} is working without auditor.`}
                makerburnCustomMessage={`View On-Chain transfers to ${actorName} on makerburn.com`}
                budgetPath={budgetPath}
              />
            </CardContainer768>
            {!isTable768 && (
              <ContainerCard>
                <CardSomethingWrong
                  title="Are you part of this Ecosystem Actor? "
                  linkText="Join Powerhouse discord #dashboard-reporting channel"
                />
              </ContainerCard>
            )}
            <TypographyStyleDescription>{subTitle}</TypographyStyleDescription>
            {paragraphDescription && isLight ? (
              <Markdown value={paragraphDescription} renderer={customRenderer} key={paragraphDescription} />
            ) : (
              <Markdown value={paragraphDescription} renderer={customRendererDark} key={paragraphDescription} />
            )}
          </div>
        )
      )}
      {!isTable768 && (
        <>
          {!isPhone && <TypographyStyleDescription>{subTitle}</TypographyStyleDescription>}
          {paragraphDescription && isLight ? (
            <Markdown value={paragraphDescription} renderer={customRenderer} key={paragraphDescription} />
          ) : (
            <Markdown value={paragraphDescription} renderer={customRendererDark} key={paragraphDescription} />
          )}
        </>
      )}
    </ViewerContainer>
  );
};

export default ActorMdViewPage;

const ViewerContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
});

const ContainerResponsive = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ContainerCard = styled('div')({
  marginBottom: '32px',
  float: 'right',
  width: 383,
  marginLeft: '68px',
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginLeft: '16px',
  },
  [lightTheme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    marginLeft: '32px',
  },
});
const TypographyStyleDescription = styled('p')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 18,
  lineHeight: theme.palette.isLight ? '21.6px' : '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  margin: '0px',
  [theme.breakpoints.up('mobile_375')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: '16px',
  },
}));

const CardContainer768 = styled('div')({
  width: '335px',
  float: 'right',
  marginLeft: 16,
  marginBottom: 16,
});
