import { useState } from 'react';
import BulletIcon from '@/components/FancyTabs/BulletIcon';
import FancyTabs from '@/components/FancyTabs/FancyTabs';
import ShadowWrapper from '@/components/FancyTabs/ShadowWrapper';
import { SectionTitle } from '../../HomeView';
import { sectionsData } from '../../staticData';

const GovernanceSection: React.FC = () => {
  // for testing purposes
  const [activeTab, setActiveTab] = useState<string>('4');

  return (
    <div>
      <SectionTitle>{sectionsData.titles[1]}</SectionTitle>

      <div>proposals here...</div>

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
        <div
          style={{
            width: '100%',
            background: 'gray',
          }}
        >
          content here...
        </div>
      </ShadowWrapper>
    </div>
  );
};

export default GovernanceSection;
