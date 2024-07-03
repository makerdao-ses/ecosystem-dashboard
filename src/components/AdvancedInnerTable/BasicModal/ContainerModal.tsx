import { styled } from '@mui/material';
import React from 'react';
import SimpleBar from 'simplebar-react';
import { Close } from '@/stories/components/svg/close';
import CategoryItem from './CategoryItem/CategoryItem';
import CheckBoxDescription from './ChekBoxDescription/ChekBoxDescription';
import type { ParsedExpenseCategoryWithExpanded } from '@ses/core/models/dto/expenseCategoriesDTO';

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
}) => (
  <Container isSomeOpen={isSomeOpen}>
    <Header>
      <ContainerTitle>
        <Title>Canonical Expense Categories</Title>
        <ContainerClose>
          <StyledClose onClick={handleCloseModal} />
        </ContainerClose>
      </ContainerTitle>
      <ContainerDescription>
        <Description>
          Canonical Expense Categories in MakerDAO are standardized classifications of expenses tailored for managing
          MakerDAO's operational costs.
        </Description>
        <CheckBoxDescription isChecked={isCheckedExpandedAll} setIsChecked={setIsCheckedExpandedAll} />
      </ContainerDescription>
    </Header>
    <ContainerScroll>
      <SimpleBarStyled scrollbarMaxSize={64}>
        <InsideModal>
          <HeadCount>Headcount Expense Categories</HeadCount>
          <Line />
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
          <NoHeadCount>Non-Headcount Expense Categories</NoHeadCount>
          <Line />
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

export default ContainerModal;

const Container = styled('div')<{ isSomeOpen?: boolean }>(({ theme, isSomeOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 27,
  overflowY: 'auto',
  height: '100%',
  background: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,

  '::-webkit-scrollbar': {
    width: '1px',
  },

  [theme.breakpoints.up('tablet_768')]: {
    paddingBottom: 40,
    borderRadius: '16px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 1114,
    paddingBottom: 64,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 1184,
    paddingBottom: !isSomeOpen ? 50 : 64,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 1184,
    paddingBottom: 64,
  },
}));

const Header = styled('div')(({ theme }) => ({
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 16,
  paddingBottom: 19,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  background: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,

  [theme.breakpoints.up('tablet_768')]: {
    padding: '16px 32px',
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 40,
    paddingRight: 40,
  },
}));

const InsideModal = styled('div')(({ theme }) => ({
  paddingLeft: 16,
  paddingRight: 16,

  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 24,
    paddingRight: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 40,
    paddingRight: 40,
  },
}));

const ContainerTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 19,

  [theme.breakpoints.up('tablet_768')]: {
    height: 29,
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 18,
  lineHeight: '21.6px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const Description = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    width: 347,
    alignItems: 'baseline',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 625,
    fontSize: 16,
    lineHeight: '24px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 725,
  },
}));

const ContainerDescription = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  alignItems: 'flex-start',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
  },
}));

const HeadCount = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  marginTop: 16,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 24,
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '21.6px',
  },
}));

const Line = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  marginTop: 8,
  marginBottom: 8,
}));

const HeadCountList = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const NoHeadCount = styled(HeadCount)(({ theme }) => ({
  marginTop: 16,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 32,
  },
}));

const ContainerTwoColumns = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
}));

const ContainerEven = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 32,
  },
}));

const ContainerOdd = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  flex: 1,
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 32,
  },
}));
const ContainerClose = styled('div')(({ theme }) => ({
  paddingRight: 3,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 6,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 3,
  },
}));

const StyledClose = styled(Close)(({ theme }) => ({
  width: 14,
  height: 14,

  [theme.breakpoints.up('tablet_768')]: {
    width: 20,
    height: 20,
  },
}));

const SimpleBarStyled = styled(SimpleBar)(({ theme }) => ({
  height: '100%',

  '.simplebar-scrollbar::before': {
    width: 4,
    marginLeft: 4,
    background: '#1aab9b',
    borderRadius: 20,
  },

  [theme.breakpoints.up('tablet_768')]: {
    maxHeight: 813,

    '.simplebar-scrollbar::before': {
      width: 6,
    },
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxHeight: 847,
  },
}));

const ContainerScroll = styled('div')({
  height: '100%',
  overflowY: 'auto',

  '::-webkit-scrollbar': {
    width: '1px',
  },
});
