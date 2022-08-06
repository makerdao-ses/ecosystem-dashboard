import React from 'react';
import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { DateTime } from 'luxon';
import { CuTableColumnLinks, LinkModel } from '../cu-table-column-links/cu-table-column-links';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { StatusChip } from '../status-chip/status-chip';
import { CuAbout, CuMip } from '../../containers/cu-about/cu-about.api';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';
import { CategoryChip } from '../category-chip/category-chip';
import { getMipsStatus, getRelateMipObjectFromCoreUnit } from '../../../core/business-logic/core-unit-about';
import _ from 'lodash';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { formatCode } from '../../../core/utils/string.utils';
import { CustomLink } from '../custom-link/custom-link';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface BudgetStatementFTEs {
  month: string
  ftes: number
}

interface BudgetStatement {
  budgetStatementFTEs: BudgetStatementFTEs[]
}
export interface SocialMediaChannels {
  cuCode: string;
  forumTag: string;
  twitter: string;
  youtube: string;
  discord: string;
  linkedIn: string;
  website: string;
}

export interface CoreUnit {
  code: string;
  name: string;
  image: string;
  category: [];
  cuMip: CuMip[];
  budgetStatements: BudgetStatement[];
  socialMediaChannels: SocialMediaChannels[];
  contributorCommitment: [];
  cuGithubContribution: [];
  roadMap: [];
}
interface Props {
  coreUnitAbout?: CuAbout | CoreUnitDto;
  hiddenTextDescription?: boolean;
}

export const getLinksCoreUnit = (cu: CuAbout | CoreUnitDto) => {
  const links: LinkModel[] = [];
  if (cu.socialMediaChannels.length === 0) return links;
  const cont = cu.socialMediaChannels[0];
  if (cont.website) {
    links.push({
      linkType: LinkTypeEnum.WWW,
      href: cont.website,
    });
  }
  if (cont.forumTag) {
    links.push({
      linkType: LinkTypeEnum.Forum,
      href: cont.forumTag,
    });
  }
  if (cont.discord) {
    links.push({
      linkType: LinkTypeEnum.Discord,
      href: cont.discord,
    });
  }
  if (cont.twitter) {
    links.push({
      linkType: LinkTypeEnum.Twitter,
      href: cont.twitter,
    });
  }
  if (cont.youtube) {
    links.push({
      linkType: LinkTypeEnum.Youtube,
      href: cont.youtube,
    });
  }
  if (cont.linkedIn) {
    links.push({
      linkType: LinkTypeEnum.LinkedIn,
      href: cont.linkedIn,
    });
  }
  return links;
};

export const TitleNavigationCuAbout = ({ coreUnitAbout, hiddenTextDescription }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const phoneDimensions = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const tableDimensions = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const lessPhone = useMediaQuery(lightTheme.breakpoints.down('table_375'));
  if (!coreUnitAbout || coreUnitAbout.cuMip.length === 0) return null;
  const buildNewArray = coreUnitAbout?.cuMip?.map((mip) => getRelateMipObjectFromCoreUnit(mip));
  const orderMips = _.sortBy(buildNewArray, ['orderBy', 'dateMip']).reverse();
  const mips = getMipsStatus(orderMips[0] as CuMip);
  const mipStatus = (orderMips[0] as CuMip).mipStatus;
  const newDate = DateTime.fromFormat(mips || '', 'yyyy-MM-dd').toJSDate();

  return (
    <Container>
      <CircleContainer>
        <CircleAvatar
          width={'68px'}
          height={'68px'}
          name={coreUnitAbout.name || 'Core Unit'}
          image={coreUnitAbout.image}
          style={{ filter: 'drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))' }}
        />
      </CircleContainer>
      <ContainerColum>
        <ContainerTitle>
          <ContainerSeparateData>
            <ResponsiveTitle>
              <TypographySES isLight={isLight}>{formatCode(coreUnitAbout.code)}</TypographySES>
              {coreUnitAbout.name && <TypographyTitle isLight={isLight}>{coreUnitAbout.name}</TypographyTitle>}
            </ResponsiveTitle>
            {(phoneDimensions || lessPhone) && <div style={{

              borderBottom: !hiddenTextDescription ? '1px solid #B6EDE7' : 'none',
              width: '100%',
              marginTop: !hiddenTextDescription ? '16px' : '0px',
            }} />}
            {!(phoneDimensions && !hiddenTextDescription) && <div style={{
              display: 'flex',
              flexDirection: 'row'
            }}>
              {mips && <StatusChip status={mipStatus as CuStatusEnum} />}
              <Row>
                {newDate && <CustomLink
                  href={coreUnitAbout.cuMip[0].mipUrl || '#'}
                  withArrow
                  styleIcon={{
                    marginTop: '3px',
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '22px',
                    fontFamily: 'FT Base, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '14px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#447AFB',
                    textDecoration: 'none',
                    marginLeft: '4px',
                  }}
                  children={`Since ${DateTime.fromJSDate(newDate).toFormat('d-MMM-y')}`}
                />}
              </Row>
            </div>}
          </ContainerSeparateData>
        </ContainerTitle>
        <ContainerCategoryConditional>{(!(phoneDimensions || lessPhone) || hiddenTextDescription) && <CategoryContainer>{coreUnitAbout.category && coreUnitAbout.category.map((item) => <CategoryChip key={item} category={item} style={{ marginRight: phoneDimensions || tableDimensions ? '8px' : '16px' }} />)}</CategoryContainer>}
          {tableDimensions && <ContainerLinks>
            <CuTableColumnLinks links={getLinksCoreUnit(coreUnitAbout)} fill='#708390' align='flex-start' spacings={16} fillDark='#ADAFD4' />
          </ContainerLinks>}
        </ContainerCategoryConditional>
        {((phoneDimensions || lessPhone) && hiddenTextDescription) && <ContainerLinks>
          <CuTableColumnLinks links={getLinksCoreUnit(coreUnitAbout)} fill='#708390' align='flex-start' spacings={16} fillDark='#ADAFD4' />
        </ContainerLinks>}
      </ContainerColum>
      {!(phoneDimensions || lessPhone || tableDimensions) && <ContainerLinks>
        <CuTableColumnLinks links={getLinksCoreUnit(coreUnitAbout)} fill='#708390' spacings={16} fillDark='#ADAFD4' />
      </ContainerLinks>}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontWeight: 400,
});

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    width: '100%',
  },
});

const TypographyTitle = styled(Typography)<{ isLight: boolean }>(({ isLight }) => ({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '29px',
  color: isLight ? '#231536' : '#E2D8EE',
  marginLeft: '16px',
  marginRight: '24px',
  fontFamily: 'FT Base, sans-serif',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    fontFamily: 'FT Base, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
    marginLeft: '4px',
    marginRight: '0px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
    marginLeft: '4px',
    marginRight: '0px',
  },
}));

const TypographySES = styled(Typography)<{ isLight: boolean }>(({ isLight }) => ({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '29px',
  color: isLight ? '#9FAFB9' : '#546978',
  fontFamily: 'FT Base, sans-serif',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
  },

}));

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '4px',
});

const ContainerLinks = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  height: '68px',
  marginRight: '6px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: '272px',
    alignItems: 'flex-start',
    height: 'fit-content',
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: '272px',
    alignItems: 'flex-start',
    height: 'fit-content',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    height: 'fit-content',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    height: 'fit-content',
    marginTop: '4px',
  },

});

const CircleContainer = styled.div({
  marginRight: '16px',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    display: 'none',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    display: 'none',
  },
});

const ContainerColum = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
});

const CategoryContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '16px',
  height: '22px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: '0px',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    marginBottom: '16px',
    marginTop: '20px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    marginBottom: '16px',
    marginTop: '20px',
  },
});
const ContainerCategoryConditional = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: '16px',
  },
});

const ContainerSeparateData = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  width: '100%',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
});

const ResponsiveTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: '100%',
    marginBottom: '6px',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    width: '100%',
    marginBottom: '6px',
  },
});

export default TitleNavigationCuAbout;
