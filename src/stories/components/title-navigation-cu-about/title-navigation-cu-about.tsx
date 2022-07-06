import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CuTableColumnLinks, LinkModel } from '../cu-table-column-links/cu-table-column-links';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { StatusChip } from '../status-chip/status-chip';
import { CuAbout, CuMip } from '../../containers/cu-about/cu-about.api';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';
import { CategoryChip } from '../category-chip/category-chip';
import { getMipsStatus, getRelateMipObjectFromCoreUnit } from '../../../core/business-logic/core-unit-about';
import _ from 'lodash';
import { CircleAvatar } from '../circle-avatar/circle-avatar';

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
  coreUnitAbout: CuAbout;
}

export const getLinksCoreUnit = (cu: CuAbout) => {
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

export const TitleNavigationCuAbout = ({ coreUnitAbout }: Props) => {
  if (!coreUnitAbout || coreUnitAbout.cuMip.length === 0) return null;
  const buildNewArray = coreUnitAbout.cuMip.map((mip: CuMip) => getRelateMipObjectFromCoreUnit(mip));
  const orderMips = _.sortBy(buildNewArray, ['orderBy', 'dateMip']).reverse();
  const mips = getMipsStatus(orderMips[0]);
  const mipStatus = orderMips[0].mipStatus;
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
            <TypographySES>SES</TypographySES>
            {coreUnitAbout.name && <TypographyTitle>{coreUnitAbout.name}</TypographyTitle>}

            {mips && <StatusChip status={mipStatus as CuStatusEnum} />}
            <Row>
              {newDate && <CustomPopover
                id={'mouse-over-popover-goto'}
                title={'Go to MIPs Portal'}
              >
                {newDate &&
                  <SinceDate
                    href={'#'}
                  >
                    Since {DateTime.fromJSDate(newDate).toFormat('d-MMM-y')}
                  </SinceDate>
                }
              </CustomPopover>}
            </Row>
          </ContainerSeparateData>
        </ContainerTitle>
        <CategoryContainer>{coreUnitAbout.category && coreUnitAbout.category.map((item) => <CategoryChip key={item} category={item} style={{ marginRight: '16px' }} />)}</CategoryContainer>
      </ContainerColum>
      <ContainerLinks>
        <CuTableColumnLinks links={getLinksCoreUnit(coreUnitAbout)} fill={'#708390'} spacingsRight={29} lastChild/>
      </ContainerLinks>
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
});

const TypographyTitle = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '29px',
  color: '#231536',
  marginLeft: '16px',
  marginRight: '24px'
});

const TypographySES = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '29px',
  color: '#9FAFB9'
});

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '4px',
});

const SinceDate = styled.a({
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
});

const ContainerLinks = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  height: '68px',
  marginRight: '6px',
});

const CircleContainer = styled.div({
  marginRight: '16px',
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
});

const ContainerSeparateData = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
});

export default TitleNavigationCuAbout;
