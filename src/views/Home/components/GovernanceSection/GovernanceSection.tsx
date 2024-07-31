import { styled } from '@mui/material';
import { useState } from 'react';
import Card from '@/components/Card/Card';
import BulletIcon from '@/components/FancyTabs/BulletIcon';
import FancyTabs from '@/components/FancyTabs/FancyTabs';
import ShadowWrapper from '@/components/FancyTabs/ShadowWrapper';
import { SectionTitle } from '../../HomeView';
import { sectionsData } from '../../staticData';

const GovernanceSection: React.FC = () => {
  // for testing purposes
  const [activeTab, setActiveTab] = useState<string>('4');

  return (
    <SectionContainer>
      <SectionTitle>{sectionsData.titles[1]}</SectionTitle>

      <div>Proposals go here... (WIP)</div>

      <ShadowWrapper>
        <FancyTabs
          tabs={[
            {
              id: '1',
              title: 'Popular',
              icon: <BulletIcon color="green" />,
            },
            {
              id: '2',
              title: 'Onboarding',
              icon: <BulletIcon color="charcoal" />,
            },
            {
              id: '3',
              title: 'Finances',
              icon: <BulletIcon color="green" />,
            },
            {
              id: '4',
              title: 'Governance',
              icon: <BulletIcon color="purple" />,
            },
            {
              id: '5',
              title: 'Atlas',
              icon: <BulletIcon color="orange" />,
            },
            {
              id: '6',
              title: 'Teams',
              icon: <BulletIcon color="blue" />,
            },
          ]}
          activeTab={activeTab}
          onTabChange={(tab: string) => setActiveTab(tab)}
        />
        <Card
          // This is for testing purposes only (WIP)
          style={{
            padding: 16,
            boxShadow: 'none',
            borderTopLeftRadius: 0,
          }}
        >
          content here...
        </Card>
      </ShadowWrapper>
    </SectionContainer>
  );
};

export default GovernanceSection;

const SectionContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));
