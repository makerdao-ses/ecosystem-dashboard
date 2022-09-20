import styled from '@emotion/styled';
import React from 'react';
import { DateTime } from 'luxon';
import { capitalizeSentence } from '../../../core/utils/string.utils';
import { CustomLink } from '../custom-link/custom-link';
import { CuTableColumnLastModifiedSkeleton } from './cu-table-column-last-modified.skeleton';

interface Props {
  date?: DateTime;
  isLoading?: boolean;
}

export const CuTableColumnLastModified = (props: Props) => {
  return !props.isLoading ? (
    <Container>
      <DateLabel>{props.date?.toFormat('dd-MMM-yyyy') ?? 'No Data'}</DateLabel>
      {props.date ? (
        <DifferenceLabel>{capitalizeSentence(props.date?.toRelative() ?? '')}</DifferenceLabel>
      ) : (
        <CustomLink
          style={{
            fontWeight: 500,
            marginLeft: 0,
            lineHeight: '19px',
          }}
          iconHeight={10}
          iconWidth={10}
          fontSize={16}
          href="https://www.notion.so/makerdao-ses/MakerDAO-Budget-Reporting-Tool-Setup-Guide-for-Data-Providers-v2-a8d59cc9a5aa4d73a4f677ddcef7d4a7"
        >
          Submit Now
        </CustomLink>
      )}
    </Container>
  ) : (
    <CuTableColumnLastModifiedSkeleton />
  );
};

const Container = styled.div({
  display: 'block',
  fontFamily: 'Inter, sans-serif',
});

const DateLabel = styled.div({
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: '#434358',
  marginBottom: '8px',
});

const DifferenceLabel = styled.div({
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: '#231536',
});
