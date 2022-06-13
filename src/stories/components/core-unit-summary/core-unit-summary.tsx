import React from 'react';
import styled from '@emotion/styled';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { CategoryChip } from '../category-chip/category-chip';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { StatusChip } from '../status-chip/status-chip';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { CustomLink } from '../custom-link/custom-link';
import { CuTableColumnLinks, LinkModel } from '../cu-table-column-links/cu-table-column-links';
import { DateTime } from 'luxon';

interface CoreUnitSummaryProps {
  title: string,
  code: string,
  imageUrl?: string,
  categories: CuCategoryEnum[],
  status: CuStatusEnum,
  mipUrl?: string,
  links: LinkModel[],
  description: string,
  statusModified?: Date
}

export const CoreUnitSummary = (props: CoreUnitSummaryProps) => {
  return <OverallWrapper>
    <Wrapper>
      <Container>
      <CircleContainer>
        <CircleAvatar
          width={'64px'}
          height={'64px'}
          name={props.title || 'Core Unit'}
          image={props.imageUrl}
          style={{ filter: 'drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))' }}
        />
      </CircleContainer>
      <Data>
        <TitleWrapper>
          <Code>{props.code}</Code>
          <Title>{props.title}</Title>
          <StatusChip status={props.status} style={{ marginRight: '4px' }}/>
          {props.statusModified && <CustomLink href={props.mipUrl}>
            {`Since ${DateTime.fromJSDate(props.statusModified).toFormat('d-MMM-y').toUpperCase()}`}
          </CustomLink>}
          <Separator/>
          <LinksWrapper>
            <CuTableColumnLinks links={props.links} fill={'#708390'}/>
          </LinksWrapper>
        </TitleWrapper>
        <Categories>
          {props.categories?.map((category) => <CategoryChip key={category} category={category} style={{ marginRight: '16px' }}/>)}
        </Categories>
      </Data>
    </Container>
    <Text>{props.description}</Text>
  </Wrapper>
  </OverallWrapper>;
};

const OverallWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Wrapper = styled.div({
  width: '100%',
  maxWidth: '1184px',
  margin: '24px 0',
});

const Container = styled.div({
  display: 'flex',
  marginBottom: '16px'
});

const CircleContainer = styled.div({
  marginRight: '16px',
});

const Data = styled.div({
  width: '100%',
});

const TitleWrapper = styled.div({
  display: 'flex',
  marginBottom: '16px',
  alignItems: 'center',
});

const Categories = styled.div({
  display: 'flex',
});

const Code = styled.span({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 500,
  fontSize: '24px',
  letterSpacing: '0.4px',
  textTransform: 'uppercase',
  color: '#9FAFB9',
  marginRight: '16px',
});

const Title = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '29px',
  letterSpacing: '0.4px',
  color: '#231536',
});

const LinksWrapper = styled.div({
  justifySelf: 'flex-end'
});

const Separator = styled.div({
  flex: 1,
});

const Text = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  color: '#231536',
});
