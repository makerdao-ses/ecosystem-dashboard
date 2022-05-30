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
import { getMipsStatus } from '../../../core/business-logic/core-unit-about';
import { getRelateMipObjectFromCoreUnit } from '../../../core/business-logic/core-units';
import _ from 'lodash';

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
      <ContainerTitle>
        <TypographySES>SES</TypographySES>
        <div style={{
          width: '4px',
          height: '4px',
          backgroundColor: '#D8E0E3',
          display: 'flex',
          marginRight: '8px',
          marginLeft: '8px'
        }} />
        {coreUnitAbout.name && <TypographyTitle>{coreUnitAbout.name}</TypographyTitle>}
        <Row>
          {mipStatus && <StatusChip status={mipStatus as CuStatusEnum} />}
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
      </ContainerTitle>
      <ContainerLinks>
        <CuTableColumnLinks links={getLinksCoreUnit(coreUnitAbout)} dark />
      </ContainerLinks>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  alignItems: 'center',
  fontWeight: 400,
});

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const TypographyTitle = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '22px',
  color: '#000000'
});

const TypographySES = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '22px',
  color: '#9FAFB9'
});

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  marginLeft: '32px',
});

const SinceDate = styled.a({
  color: '#898989',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  textDecoration: 'underline',
  marginLeft: '10px'
});

const ContainerLinks = styled.div({
  display: 'flex',
  alignItems: 'center'
});

export default TitleNavigationCuAbout;
