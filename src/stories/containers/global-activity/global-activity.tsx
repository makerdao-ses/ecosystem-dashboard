import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import ActivityTable from '../../components/cu-activity-table/cu-activity-table';
import { Paragraph, Title } from '../cu-activity/cu-activity';
import { useGlobalActivityMvvm } from './global-activity.mvvm';

interface Props {
  coreUnits: CoreUnitDto[];
}

export default ({ coreUnits }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';

  const { columns, activityFeed } = useGlobalActivityMvvm(coreUnits);

  return (
    <Wrapper>
      <Container isLight={isLight}>
        <InnerPage>
          <Title isLight={isLight}>Activity Feed</Title>
          <Paragraph isLight={isLight}>
            Change tracking displays all changes that have occurred regarding all Core unit activity. Here you will be
            able to see all previous modifications the Core units made to their Expense Reports, FTEs, and more.
          </Paragraph>
          <TableWrapper>
            <ActivityTable columns={columns} shortCode={'global'} activityFeed={activityFeed} />
          </TableWrapper>
        </InnerPage>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '64px',
  flex: 1,
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  padding: '0 16px 128px',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '0 32px 128px',
  },
}));

const InnerPage = styled.div({
  display: 'block',
  margin: '24px auto 0',
  width: '100%',
  maxWidth: '1312px',
  textAlign: 'left',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: '32px',
  },
});

const TableWrapper = styled.div({
  maxWidth: '1312px',
  width: '100%',
  margin: '0 auto',
});
