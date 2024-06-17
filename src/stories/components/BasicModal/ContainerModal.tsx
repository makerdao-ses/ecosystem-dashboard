import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import SimpleBar from 'simplebar-react';
import { Close } from '../svg/close';
import CategoryItem from './CategoryItem/CategoryItem';
import CheckBoxDescription from './ChekBoxDescription/ChekBoxDescription';
import type { ParsedExpenseCategoryWithExpanded } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  headCountCategories: ParsedExpenseCategoryWithExpanded[];
  noHeadCountCategories: ParsedExpenseCategoryWithExpanded[];
  isCheckedExpandedAll?: boolean;
  setIsCheckedExpandedAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseModal: () => void;
  isSomeOpen?: boolean;
  handleChangeItemAccordion: (id: string, expanded: boolean) => void;
}

const ContainerModal: React.FC<Props> = ({
  headCountCategories,
  noHeadCountCategories,
  isCheckedExpandedAll,
  setIsCheckedExpandedAll,
  handleCloseModal,
  isSomeOpen = false,
  handleChangeItemAccordion,
}) => {
  const { isLight } = useThemeContext();
  return (
    <Container isLight={isLight} isSomeOpen={isSomeOpen}>
      <Header isLight={isLight}>
        <ContainerTitle>
          <Title isLight={isLight}>Canonical Expense Categories</Title>
          <ContainerClose>
            <StyledClose onClick={handleCloseModal} />
          </ContainerClose>
        </ContainerTitle>
        <ContainerDescription>
          <Description isLight={isLight}>
            Canonical Expense Categories in MakerDAO are standardized classifications of expenses tailored for managing
            MakerDAO's operational costs.
          </Description>
          <CheckBoxDescription isChecked={isCheckedExpandedAll} setIsChecked={setIsCheckedExpandedAll} />
        </ContainerDescription>
      </Header>
      <ContainerScroll>
        <SimpleBarStyled scrollbarMaxSize={64}>
          <InsideModal>
            <HeadCount isLight={isLight}>Headcount Expense Categories</HeadCount>
            <Line isLight={isLight} />
            <HeadCountList>
              {headCountCategories?.map((item) => (
                <CategoryItem
                  key={item.name}
                  category={item}
                  expanded={item.isExpanded}
                  handleChangeItemAccordion={handleChangeItemAccordion}
                />
              ))}
            </HeadCountList>
            <NoHeadCount isLight={isLight}>Non-Headcount Expense Categories</NoHeadCount>
            <Line isLight={isLight} />
            <ContainerTwoColumns>
              <ContainerEven>
                {noHeadCountCategories
                  ?.slice(0, noHeadCountCategories.length / 2)

                  .map((item) => (
                    <CategoryItem
                      category={item}
                      key={item.name}
                      expanded={item.isExpanded}
                      handleChangeItemAccordion={handleChangeItemAccordion}
                    />
                  ))}
              </ContainerEven>
              <ContainerOdd>
                {noHeadCountCategories
                  ?.slice(noHeadCountCategories.length / 2, noHeadCountCategories.length)

                  .map((item) => (
                    <CategoryItem
                      category={item}
                      key={item.name}
                      expanded={item.isExpanded}
                      handleChangeItemAccordion={handleChangeItemAccordion}
                    />
                  ))}
              </ContainerOdd>
            </ContainerTwoColumns>
          </InsideModal>
        </SimpleBarStyled>
      </ContainerScroll>
    </Container>
  );
};

export default ContainerModal;

const Container = styled.div<WithIsLight & { isSomeOpen?: boolean }>(({ isLight, isSomeOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 27,
  overflowY: 'auto',
  height: '100%',
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',

  '::-webkit-scrollbar': {
    width: '1px',
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingBottom: 40,
    borderRadius: '16px',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    maxWidth: 1114,
    paddingBottom: 64,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 1184,
    paddingBottom: !isSomeOpen ? 50 : 64,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 1184,
    paddingBottom: 64,
  },
}));

const Header = styled.div<WithIsLight>(({ isLight }) => ({
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 16,
  paddingBottom: 19,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : ' 10px 15px 20px 6px rgba(20, 0, 141, 0.1)',

  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 24,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 40,
    paddingRight: 40,
  },
}));

const InsideModal = styled.div({
  paddingLeft: 16,
  paddingRight: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingLeft: 24,
    paddingRight: 24,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 40,
    paddingRight: 40,
  },
});

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 19,

  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 29,
  },
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  lineHeight: '19px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '29px',
    letterSpacing: '0.4px',
  },
}));

const Description = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '17px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  color: isLight ? '#231536' : '#D2D4EF',
  width: '100%',

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 435,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',
    alignItems: 'baseline',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 625,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 725,
  },
}));

const ContainerDescription = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 19,
  alignItems: 'flex-end',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
  },
});

const HeadCount = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '19px',
  marginTop: 16,
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '0.4px',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 32,
  },
}));

const Line = styled.div<WithIsLight>(({ isLight }) => ({
  borderBottom: isLight ? '1px solid #D4D9E1' : '1px solid #405361',
  marginTop: 8,
  marginBottom: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 15,
    marginBottom: 24,
  },
}));

const HeadCountList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 32,
  },
});

const NoHeadCount = styled(HeadCount)<WithIsLight>({
  marginTop: 32,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 40,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 64,
  },
});

const ContainerTwoColumns = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
});

const ContainerEven = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 32,
  },
});

const ContainerOdd = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  flex: 1,
  gap: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 32,
  },
});
const ContainerClose = styled.div({
  paddingRight: 3,

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 6,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 3,
  },
});

const StyledClose = styled(Close)({
  width: 14,
  height: 14,

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 20,
    height: 20,
  },
});

const SimpleBarStyled = styled(SimpleBar)({
  height: '100%',

  '.simplebar-scrollbar::before': {
    width: 4,
    marginLeft: 4,
    background: '#1aab9b',
    borderRadius: 20,
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    maxHeight: 813,

    '.simplebar-scrollbar::before': {
      width: 6,
    },
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    maxHeight: 847,
  },
});

const ContainerScroll = styled.div({
  height: '100%',
  overflowY: 'auto',

  '::-webkit-scrollbar': {
    width: '1px',
  },
});
