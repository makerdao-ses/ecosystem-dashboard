import styled from '@emotion/styled';
import { siteRoutes } from '@ses/config/routes';
import { filterDataActors } from '@ses/containers/Actors/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { getArrayParam } from '@ses/core/utils/filters';
import { buildQueryString } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BreadCrumbNavigation from '../BreadCrumbNavigation/BreadCrumbNavigation';
import ActorTitleWithDescription from './ActorTitleWithDescription';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';

interface ActorSummaryProps {
  actors: EcosystemActor[];
  trailingAddress?: string[];
  breadcrumbTitle?: string;
  cutTextTooLong?: boolean;
}

const ActorSummary: React.FC<ActorSummaryProps> = ({
  actors: data = [],
  breadcrumbTitle,
  cutTextTooLong,
  trailingAddress = [],
}) => {
  const { isLight } = useThemeContext();

  const [showTextDescription, setShowTextDescription] = useState(true);
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;

  // This is for the filter in the page of list actors about
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);

  const actorAbout = data?.find((actor) => actor.shortCode === code) || ({} as EcosystemActor);

  const buildCULabel = () => (!_.isEmpty(actorAbout) ? `${actorAbout?.name}` : '');

  const ref = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    _.debounce(() => {
      setShowTextDescription((ref?.current?.offsetTop ?? 0) <= 65);
    }, 50),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll);

    // Remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [handleScroll]);

  const filteredData = useMemo(() => {
    const { filteredCategoryData } = filterDataActors({
      data: data as EcosystemActor[],
      filteredCategories,
    });

    return filteredCategoryData;
  }, [data, filteredCategories]);

  const page = useMemo(() => filteredData?.findIndex((item) => item.shortCode === code) + 1, [code, filteredData]);

  const queryStrings = buildQueryString({
    ...router.query,
    filteredCategories,
    code: null, // override the Actors Code code to avoid add it to the query string as Core Unit
  });

  const changeCoreUnitCode = useCallback(
    (direct: -1 | 1) => () => {
      const index = filteredData?.findIndex((item) => item.shortCode === code);
      const newIndex = index + direct;
      if (newIndex >= 0 && newIndex < filteredData?.length) {
        router.push(`${router.route.replace('[code]', filteredData[newIndex].shortCode)}${queryStrings}`);
      }
    },
    [code, filteredData, queryStrings, router]
  );

  return (
    <MainContainer ref={ref} isLight={isLight}>
      <BreadCrumbNavigation
        descriptionTextPagination="Ecosystem Actors"
        itemActual={page}
        mainUrl={`${siteRoutes.ecosystemActors}/${queryStrings}`}
        labelFirstItemNavigation={{
          label: buildCULabel(),
          url: `${siteRoutes.coreUnitAbout(code)}/${queryStrings}`,
        }}
        totalElements={filteredData.length}
        onClickLeft={changeCoreUnitCode(-1)}
        onClickRight={changeCoreUnitCode(1)}
        breadcrumbTitleMobile={buildCULabel()}
        hasStyleMobileItem={[buildCULabel(), undefined].includes(breadcrumbTitle)}
        trailingAddress={trailingAddress}
        router={router}
      />

      <ActorTitleWithDescription
        actorAbout={actorAbout}
        showTextDescription={showTextDescription}
        cutTextTooLong={cutTextTooLong}
      />

      <ContainerResponsiveMobile showTextDescription={showTextDescription} isLight={isLight} />
    </MainContainer>
  );
};

export default ActorSummary;
const MainContainer = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  position: 'sticky',
  top: 64,
  width: '100%',
  background: isLight ? '#FFFFFF' : '#25273D',
  backgroundImage: isLight ? 'url(/assets/img/Subheader.png)' : 'url(/assets/img/Subheader-dark.png)',
  backgroundSize: 'cover',
  zIndex: 3,
}));

const ContainerResponsiveMobile = styled.div<{ isLight: boolean; showTextDescription: boolean }>(
  ({ isLight, showTextDescription }) => ({
    position: 'relative',
    borderBottom: isLight ? '1px solid #B6EDE7' : '1px solid #027265',
    width: '100%',
    marginTop: showTextDescription ? '24px' : 0,

    [lightTheme.breakpoints.up('table_834')]: {
      marginTop: '24px',
    },

    [lightTheme.breakpoints.between('table_375', 'table_834')]: {
      marginTop: showTextDescription ? '16px' : '0px',
    },
  })
);
