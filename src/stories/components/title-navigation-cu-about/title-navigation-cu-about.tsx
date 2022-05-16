import React from 'react';
import styled from '@emotion/styled';
import { Chip, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CutableColumnLinks, LinkModel, LinkType } from '../cutable-column-links/cutable-column-links';
import { CoreUnit, CuMip, CuMipStatus } from '../../containers/cu-about/cu-about.api';

interface Props {
  coreUnit: CoreUnit;
}

export const getMipsStatus = (mip: CuMip) => {
  switch (mip.mipStatus) {
    case CuMipStatus.Accepted:
      return mip.accepted;
    case CuMipStatus.Obsolete:
      return mip.obsolete;
    case CuMipStatus.FORMAL:
      return mip.formalSubmission;
    case CuMipStatus.Rejected:
      return mip.rejected;
    case CuMipStatus.RFC:
      return mip.rfc;
    default:
      return mip.rejected;
  }
};

export const getLinksCoreUnit = (cu: CoreUnit) => {
  const links: LinkModel[] = [];
  if (cu.socialMediaChannels.length === 0) return links;
  const cont = cu.socialMediaChannels[0];
  if (cont.website) {
    links.push({
      linkType: LinkType.WWW,
      href: cont.website,
    });
  }
  if (cont.forumTag) {
    links.push({
      linkType: LinkType.Forum,
      href: cont.forumTag,
    });
  }
  if (cont.discord) {
    links.push({
      linkType: LinkType.Discord,
      href: cont.discord,
    });
  }
  if (cont.twitter) {
    links.push({
      linkType: LinkType.Twitter,
      href: cont.twitter,
    });
  }
  if (cont.youtube) {
    links.push({
      linkType: LinkType.Youtube,
      href: cont.youtube,
    });
  }
  if (cont.linkedIn) {
    links.push({
      linkType: LinkType.LinkedIn,
      href: cont.linkedIn,
    });
  }
  return links;
};

export const TitleNavigationCuAbout = ({ coreUnit }: Props) => {
  const mips = getMipsStatus(coreUnit.cuMip[0] || {} as CuMip);
  return (
    <Container>
      <ContainerTitle>
        <TypographySES>SES</TypographySES>
        <div style={{ width: '4px', height: '4px', backgroundColor: '#D8E0E3', display: 'flex', marginRight: '8px', marginLeft: '8px' }} />
        <TypographyTitle>{coreUnit.name}</TypographyTitle>

        <Row>
          {coreUnit.cuMip[0].mipStatus && <Chip size={'small'} sx={{ borderRadius: '8px', borderColor: '#25273D' }} label={coreUnit.cuMip[0].mipStatus} variant={'outlined'} />}
          {coreUnit.cuMip[0].mipStatus && <CustomPopover
            id={'mouse-over-popover-goto'}
            title={'Go to MIPs Portal'}
          >
            <SinceDate
              href={'#'}
            >
              Since {DateTime.fromJSDate(new Date(mips || '')).toFormat('d-MMM-y')}
            </SinceDate>
          </CustomPopover>}
        </Row>
      </ContainerTitle>
      <ContainerLinks>
        <CutableColumnLinks links={getLinksCoreUnit(coreUnit)} dark />
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

const TypographyTitle = styled(Typography)`
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 22px;
color: #000000;
`;
const TypographySES = styled(Typography)`
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 22px;
color: #9FAFB9;
`;

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  marginLeft: '32px',
});

const SinceDate = styled.a({
  color: 'gray',
  fontSize: '12px',
  textDecoration: 'underline',
  marginLeft: '10px'
});

const ContainerLinks = styled.div({
  display: 'flex',
  alignItems: 'center'
});

export default TitleNavigationCuAbout;
