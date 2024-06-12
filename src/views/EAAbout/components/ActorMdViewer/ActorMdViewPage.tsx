import { styled, useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { ResourceType } from '@ses/core/models/interfaces/types';
import Markdown from 'marked-react';
import React from 'react';
import CustomSheetFinancesCU from '@/views/CUAbout/CustomSheetFinancesCU';
import { customRenderer, customRendererDark } from '@/views/CUAbout/Markdown/renderUtils';
import CardExpenses from '@/views/CUAbout/NavigationCard/CardExpenses';
import CardSomethingWrong from '@/views/CUAbout/NavigationCard/CardSomethingWrong';
import CardProjects from '../CardProjects/CardProjects';
import CustomSheetProjects from '../CustomSheetProjects';
import type { Theme } from '@mui/material';
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
  auditorTitle: string;
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
  auditorTitle,
}: Props) => {
  const { isLight } = useThemeContext();
  const isTable768 = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isPhone = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const [isEnabled] = useFlagsActive();

  return (
    <ViewerContainer>
      {showButton && !isTable768 ? (
        <ContainerResponsive>
          <ContainerShowOnlyMobile>
            <TypographyStyleDescription>{subTitle}</TypographyStyleDescription>
            <ContainerButton>
              <CustomSheetProjects queryStrings={queryStrings} shortCode={shortCode} />
              <CustomSheetFinancesCU
                budgetPath={budgetPath}
                code={code}
                shortCode={shortCode}
                queryStrings={queryStrings}
                type={ResourceType.EcosystemActor}
                auditorTitle={auditorTitle}
                auditors={auditors}
              />
            </ContainerButton>
          </ContainerShowOnlyMobile>
        </ContainerResponsive>
      ) : (
        showButton &&
        isTable768 && (
          <div>
            <CardContainer768>
              {isEnabled('FEATURE_TEAM_PROJECTS') && <CardProjects actorName={actorName} shortCode={shortCode} />}
              <CardExpenses
                resource={ResourceType.EcosystemActor}
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
  flexDirection: 'column',
  gap: 16,
});

const ContainerButton = styled('div')(() => ({
  display: 'flex',
  gap: 16,
}));

const ContainerCard = styled('div')(({ theme }) => ({
  marginBottom: '32px',
  float: 'right',
  width: 383,
  marginLeft: '68px',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginLeft: '16px',
  },
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    marginLeft: '32px',
  },
}));
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

const ContainerShowOnlyMobile = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));
const CardContainer768 = styled('div')({
  width: '335px',
  float: 'right',
  marginLeft: 16,
  marginBottom: 16,
});
