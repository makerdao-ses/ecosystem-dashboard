import { styled } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import ButtonLinksSheet from '@/components/ButtonLinksSheet/ButtonLinksSheet';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import { siteRoutes } from '@/config/routes';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import { buildQueryString } from '@/core/utils/urls';

interface Props {
  coreUnit: CoreUnit;
  className?: string;
}

const ListMobileSheetIconArrow: React.FC<Props> = ({ coreUnit, className }) => {
  const router = useRouter();
  const queryStrings = useMemo(() => buildQueryString(router.query), [router.query]);
  return (
    <ContainerLinksArrowsMobile className={className}>
      <ButtonLinksSheet />
      <InternalLinkButtonStyled href={`${siteRoutes.coreUnitAbout(coreUnit.shortCode)}/${queryStrings}`} showIcon />
    </ContainerLinksArrowsMobile>
  );
};

export default ListMobileSheetIconArrow;
const ContainerLinksArrowsMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  height: 32,
  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'flex-end',
  },
}));

const InternalLinkButtonStyled = styled(InternalLinkButton)({
  borderRadius: 8,
  padding: '2px 8px 2px 8px',
  ':hover': {
    padding: '2px 8px 2px 8px',
  },
});
