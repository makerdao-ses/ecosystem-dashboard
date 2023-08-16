import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import KeyChangeSection from '../KeyChangeSection/KeyChangeSection';
import GovernanceSection from './Sections/GovernanceSection';
import OperationsSection from './Sections/OperationsSection';
import TokenUpgradesSection from './Sections/TokenUpgradesSection';
import { KeyChangesSectionsEnum } from './SectionsEnum';

const KeyChangesSections: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState<KeyChangesSectionsEnum | undefined>(
    KeyChangesSectionsEnum.GOVERNANCE
  );

  const handleExpand = (section: KeyChangesSectionsEnum) => () =>
    setActiveSection(activeSection === section ? undefined : section);

  return (
    <KeyChangesSectionsContainer>
      <KeyChangeSection
        title="Governance"
        expanded={activeSection === KeyChangesSectionsEnum.GOVERNANCE}
        onExpand={handleExpand(KeyChangesSectionsEnum.GOVERNANCE)}
      >
        <SectionContainer>
          <GovernanceSection />
        </SectionContainer>
      </KeyChangeSection>

      <KeyChangeSection
        title="Operations"
        expanded={activeSection === KeyChangesSectionsEnum.OPERATIONS}
        onExpand={handleExpand(KeyChangesSectionsEnum.OPERATIONS)}
      >
        <SectionContainer>
          <OperationsSection />
        </SectionContainer>
      </KeyChangeSection>

      <KeyChangeSection
        title="Token upgrades"
        expanded={activeSection === KeyChangesSectionsEnum.TOKEN_UPGRADES}
        onExpand={handleExpand(KeyChangesSectionsEnum.TOKEN_UPGRADES)}
      >
        <SectionContainer>
          <TokenUpgradesSection />
        </SectionContainer>
      </KeyChangeSection>
    </KeyChangesSectionsContainer>
  );
};

export default KeyChangesSections;

const KeyChangesSectionsContainer = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
});

export const SectionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    flexDirection: 'row',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 128,
  },
});
