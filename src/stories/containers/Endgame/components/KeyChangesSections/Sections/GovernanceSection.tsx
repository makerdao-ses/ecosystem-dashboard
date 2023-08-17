import React from 'react';
import KeyChangeCard from '../../KeyChangeCard/KeyChangeCard';

const GovernanceSection: React.FC = () => (
  <>
    <KeyChangeCard
      from="Recognized Delegates"
      to={['Aligned voter committees (AVC)', 'Aligned Delegates (AD)']}
      title="Improved voter participation"
      readMore={[
        {
          title: 'View AVCs & Delegates on the voting portal',
          href: 'https://vote.makerdao.com/delegates',
        },
        {
          title: 'Overview of recognized delegates legacy budgets',
          href: 'https://expenses.makerdao.network/delegates',
        },
      ]}
    >
      Due to voter apathy within MakerDAO governance and DAOs more broadly, the DAO will transition from a model of
      recognized delegates to two groups consisting of aligned voter committees, and aligned delegates. MKR holders who
      are interested in Maker governance can now participate in voter committees of their liking to discuss policy with
      the relevant delegates.
    </KeyChangeCard>
    <KeyChangeCard
      from="Maker Improvement Proposals (MIPs)"
      to={['The Maker Atlas', 'Five Scope Artifacts']}
      title="Refocusing on core business activities"
      readMore={[
        {
          title: 'Maker Atlas & Scope Artifacts full text',
          href: 'https://powerhouse.gitbook.io/maker-alignment-artifacts/',
        },
        {
          title: 'View the legacy MIPs portal',
          href: 'https://mips.makerdao.com/',
        },
      ]}
    >
      Before Endgame, Maker Improvement Proposals allowed any change to Maker Governance without much restriction or
      direction. The Endgame plan introduces the Maker Atlas which defines much better what the core business of the
      Maker Protocol is all about. It also introduces five Scope Artifacts which defines how Maker should operate within
      different operational areas.
    </KeyChangeCard>
  </>
);

export default GovernanceSection;
