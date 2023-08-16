import { siteRoutes } from '@ses/config/routes';
import React from 'react';
import KeyChangeCard from '../../KeyChangeCard/KeyChangeCard';

const OperationsSection: React.FC = () => (
  <>
    <KeyChangeCard
      from="Core Units"
      to={['Ecosystem Actors', 'SubDAOs']}
      title="Spinning out non-core business activities"
      readMore={[
        {
          title: 'View Ecosystem Actors on the Expenses Dashboard',
          href: siteRoutes.ecosystemActors,
        },
        {
          title: 'SubDAOs and their role in the Endgame',
          href: 'https://endgame.makerdao.com/subdaos/overview',
        },
      ]}
    >
      A strategic shift to Ecosystem Actors and SubDAOs, replacing traditional core units. These actors, guided by Scope
      Alignment Artifacts, handle essential tasks across various domains. SubDAOs, as semi-independent entities, are
      linked to Maker Governance, streamlining operations and fostering innovation, decentralization, and growth in the
      MakerDAO ecosystem.
    </KeyChangeCard>
    <KeyChangeCard
      from={['Core Unit', 'SPF budgeting']}
      to="Project Based Budgeting"
      title="Renewed focus on delivering results "
      readMore={[
        {
          title: 'Powerhouse introduction and Project-Based Workflows',
          href: 'https://forum.makerdao.com/t/professional-ecosystem-actor-introduction-powerhouse/21057#:~:text=expense%20reporting%20editor.-,PBW%20%E2%80%93%20Project%2DBased%20Workflows,-%3A%20roadmaps%20and%20progress',
        },
        {
          title: 'Maker Atlas & DAO Toolkit',
          href: 'https://powerhouse.gitbook.io/maker-alignment-artifacts/mip102c2-sp13/mip101-maker-atlas-immutable-alignment-artifact',
        },
      ]}
    >
      A shift from existing Core Unit and Special Purpose Fund budgeting methods to a Project-based approach. This
      change improves clarity and accountability by consolidating related deliverables under projects, thus establishing
      distinct ownership and a more focused orientation towards achieving measurable results.
    </KeyChangeCard>
  </>
);

export default OperationsSection;
