import React from 'react';
import KeyChangeCard from '../../KeyChangeCard/KeyChangeCard';

const TokenUpgradesSection: React.FC = () => (
  <>
    <KeyChangeCard
      from="DAI"
      to="DAI + NewStableToken"
      title="Extending the DAI brand"
      readMore={[
        {
          title: 'Endgame Tokenomics',
          href: 'https://endgame.makerdao.com/tokenomics/elixir',
        },
        {
          title: 'Dai management & Stability Scope',
          href: 'https://powerhouse.gitbook.io/maker-alignment-artifacts/mip102c2-sp13/mip104-stability-scope',
        },
      ]}
    >
      Strategic initiatives that leverage DAI's core strengths, such as stability and decentralization, to expand its
      presence and relevance in the wider cryptocurrency ecosystem.
    </KeyChangeCard>
    <KeyChangeCard
      from="MKR"
      to="MKR + NewGovToken"
      title="A better voter incentive model"
      readMore={[
        {
          title: 'MKR Tokenomics',
          href: 'https://endgame.makerdao.com/tokenomics/mkr-tokenomics',
        },
        {
          title: 'Maker Atlas & Incentivized Alignment',
          href: 'https://powerhouse.gitbook.io/maker-alignment-artifacts/mip102c2-sp13/mip101-maker-atlas-immutable-alignment-artifact#:~:text=from%20misaligned%20competitors.-,Incentivized%20Alignment,-Incentivized%20Alignment%20is',
        },
      ]}
    >
      The improved voter incentive model utilizes MKR and NewGovToken to encourage active participation and informed
      decision-making within MakerDAO's governance ecosystem, enhancing decentralized governance.
    </KeyChangeCard>
  </>
);

export default TokenUpgradesSection;
