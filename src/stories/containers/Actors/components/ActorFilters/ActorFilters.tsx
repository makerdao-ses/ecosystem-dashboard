import { styled, useMediaQuery, useTheme } from '@mui/material';
import { CategoryChip } from '@ses/components/CategoryChip/CategoryChip';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import { Close } from '@ses/components/svg/close';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { ActorCategory } from '@ses/core/models/interfaces/types';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ScopeChip from '../ScopeChip/ScopeChip';
import { FILTER_SCOPE_ACTOR } from './utils';
import type { ActorScopeEnum } from '@ses/core/enums/actorScopeEnum';
import type { TeamCategory } from '@ses/core/models/interfaces/types';
interface Props {
  handleResetFilter: () => void;
  readMore: boolean;
  filteredCategories: string[];
  filteredScopes: string[];
  categoriesCount: { [id: string]: number };
  scopeCount: { [id: string]: number };
  onChange?: (items: string[]) => void;
  isDisabled?: boolean;
  onChangeScope?: (items: string[]) => void;
}
const categories = Object.values(ActorCategory) as string[];
const ActorFilters: React.FC<Props> = ({
  handleResetFilter,
  readMore,
  filteredCategories,
  categoriesCount,
  onChange,
  filteredScopes,
  onChangeScope,
  scopeCount,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isDisabled = filteredCategories.length <= 0 && filteredScopes.length <= 0;
  const isLight = theme.palette.mode === 'light';
  const colorButton = isLight ? (isDisabled ? '#ECEFF9' : '#231536') : isDisabled ? '#48495F' : '#D4D9E1';
  const result = FILTER_SCOPE_ACTOR.filter((item) => filteredScopes.includes(item.name.replace(/\s+/g, '')));
  const [isEnabled] = useFlagsActive();

  const label =
    filteredScopes.length === 1 ? (isMobile ? result[0].code : `${result[0].code} ${result[0].name}`) : 'Scopes';
  return (
    <FiltersContainer>
      <Reset>
        <ResetButton onClick={handleResetFilter} disabled={isDisabled} hasIcon={false} label="Reset filters" />
      </Reset>
      <FilterActorsContainer readMore={readMore}>
        {isEnabled('FEATURE_ECOSYSTEM_ACTORS_SCOPES_FILTER') && (
          <ScopeFilter>
            <CustomMultiSelectStyled
              label={label}
              popupContainerHeight={260}
              showMetricOneItemSelect
              activeItems={filteredScopes}
              items={FILTER_SCOPE_ACTOR.map((scope) => ({
                id: scope.id,
                content: <ScopeChip code={scope.code} status={scope.name as ActorScopeEnum} />,
                count: scopeCount[scope.name],
              }))}
              onChange={onChangeScope}
              popupContainerWidth={260}
              listItemWidth={240}
              customAll={{
                id: 'All',
                content: <ScopeChip code="All" status="All" codeOnly isUppercase={false} />,
                count: scopeCount.All,
              }}
            />
          </ScopeFilter>
        )}
        <RoleFilter>
          <CustomMultiSelectStyled
            popupContainerHeight={180}
            positionRight={true}
            label="Actor Role"
            activeItems={filteredCategories}
            customAll={{
              id: 'All',
              content: <CategoryChip category={'All'} />,
              count: categoriesCount.All,
            }}
            width={144}
            popupContainerWidth={250}
            listItemWidth={218}
            items={categories.map((cat) => ({
              id: cat,
              content: <CategoryChip category={cat as TeamCategory} />,
              count: categoriesCount[cat],
            }))}
            onChange={onChange}
          />
        </RoleFilter>
      </FilterActorsContainer>
      <ResponsiveButton onClick={!isDisabled ? handleResetFilter : undefined} isDisabled={isDisabled}>
        <Close width={10} height={10} fill={colorButton} fillDark={colorButton} />
      </ResponsiveButton>
    </FiltersContainer>
  );
};

export default ActorFilters;

const FiltersContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: 8,
  gridTemplateColumns: 'auto auto auto',
  gridTemplateRows: 'auto',
  placeItems: 'space-between',
  justifyContent: 'end',

  gridTemplateAreas: `
  "filterScope filterRole resetMobile"
  `,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 'revert',
    width: '100%',
    gridTemplateRows: 'auto',
    margin: '0px',
    justifyContent: 'flex-end',
    gridTemplateAreas: '"reset filterScope filterRole"',
  },
}));

const Reset = styled('div')(({ theme }) => ({
  gridArea: 'reset',
  display: 'none',
  justifyContent: 'flex-end',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    marginRight: 32,
  },
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    marginRight: 16,
  },
}));

const FilterActorsContainer = styled('div')<{ readMore?: boolean }>(({ readMore, theme }) => ({
  display: 'flex',
  marginRight: readMore ? 11 : 'unset',
  gap: 8,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    marginRight: 0,
    flex: 1,
    width: '100%',
  },
}));

const CustomMultiSelectStyled = styled(CustomMultiSelect)({
  right: 0,
});

const ResponsiveButton = styled('div')<{ isDisabled: boolean }>(({ isDisabled, theme }) => ({
  display: 'flex',
  gridArea: 'resetMobile',
  justifySelf: 'flex-end',
  height: '34px',
  cursor: 'pointer',
  width: '34px',
  border:
    theme.palette.mode === 'light'
      ? `1px solid ${isDisabled ? '#ECEFF9' : '#D4D9E1'}`
      : `1px solid ${isDisabled ? '#10191F' : '#D4D9E1'}`,
  borderRadius: '22px',
  alignItems: 'center',
  justifyContent: 'center',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const RoleFilter = styled('div')({});
const ScopeFilter = styled('div')({});
