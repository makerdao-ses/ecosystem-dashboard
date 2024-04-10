import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { EcosystemActorBuilder } from '@ses/core/businessLogic/builders/actors/actorsBuilder';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import { defaultSocials } from '../Actors/utils/utils';
import AppLayout from '../AppLayout/AppLayout';
import ActorAboutContainer from './ActorAboutContainer';
import type { Meta } from '@storybook/react';

const actorsItems = [
  new EcosystemActorBuilder()
    .withId('43')
    .withCode('DEWIZ-001')
    .withShortCode('DEWIZ')
    .withName('Powerhouse Inc.')
    .withType(ResourceType.EcosystemActor)
    .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
    .addCategory('Active Ecosystem Actor')
    .withSentenceDescription(
      'Dewiz is a team of engineers with a proven track record of delivering high-quality, secure, and reliable smart contracts for the premier DeFi projects.'
    )
    .withParagraphDescription(
      '# **About Us**\n\nDewiz DeFi Engineering Services provides organizations flexible access to battle-tested smart contract engineers that confront the wizardry of DeFi protocols.\n        \nDeFi concepts and strategies can be complex. Turning these ideas into reality using ground-breaking and evolving technology only compounds the challenges. For organizations struggling to master smart contract development or those that prefer a turnkey experience when navigating smart contracts, Dewiz offers a full suite of services to support any DeFi-related project on Ethereum, L2s, and many EVM-compatable chains.\n        \n# **Services offered**\n        \nDewiz gives your project smart contract engineers to utilize as much (or as little) as you need, for every aspect of the development lifecycle. Dewiz provides on-demand services for ideation, innovation, and tailored solution design in addition to writing the actual code. The team is committed to maintaining the highest standards of quality and security in all of its work.\n        \n**Smart Contract Operations**\n        \nSmart contract operations are typically focused on using, maintaining, and improving the functionality of existing smart contracts. This includes writing Spells, reviewing and testing code, monitoring the performance of smart contracts, and responding to issues or bugs as they arise.\n        \nA key-engagement point for Dewiz in the Maker ecosystem is the authoring of Spells for common and novel use cases at MakerDAO. Dewiz is excited for the opportunity to grow alongside the needs of SubDAOs for Spell related tasks and aims to create enhancements for our clients as the demand for this service grows and takes shape operationally.\n        \n**Smart Contract Product Development**\n        \nSmart contract development encompasses creating new smart contracts and implementing new features and functionality. This involves designing, architecting, writing code, testing and debugging new contracts, and working with other teams to integrate the new contracts into the broader system.\n        \nSubDAOs that choose to work exclusively with Ecosystem Actors for smart contract services can look forward to a consistent experience when engaging Dewiz when developing new protocol features. Dewiz’s engineering experience will support faster development cycles and successful code deployments.\n        \n**Integrating DeFi & CeFi**\n        \nDewiz is purpose built and focused on opportunities to contribute engineering services in DeFi. This includes designing and implementing smart contracts that seamlessly bring the benefits of DeFi to projects that need it. Whether a client is a DeFi project looking to incorporate traditional financial instruments, or a CeFi organization seeking to tap into the power of decentralized technology, Dewiz can provide the support and guidance need to navigate a boundary-breaking project to a successful deployment.\n        \n**Documentation & Technical Assessments**\n        \nCorrectly supporting code for a public blockchain is paramount for the success of a project.\n        \nDocumentation in the DeFi space is utilized by the developers authoring the code, auditors reviewing the code, and even expert users who desire to have a clear understanding of what actions a smart contract is performing. Well-documented code helps to improve the development process, and the security of the contract by making it easier for external reviewers to identify potential vulnerabilities and security risks. Clear and thorough documentation also makes it easier for users of the contract to understand how it works and how to interact with it, which increases trust and adoption.\n        \nTechnical assessments also help to identify potential issues with the contract’s design or implementation before any development work begins. This can save time and money by ensuring that the contract is developed in the most efficient and effective way possible. A technical assessment can also help to identify potential security vulnerabilities or other risks in the contract, which can be addressed before they become a problem. These assessments also provide valuable insights and recommendations that can be used to improve the contract’s design and functionality before writing a line of code.\n        \n**Seamless Engagements**\n        \nIn addition to the team’s technical expertise, Dewiz also supports a strong understanding of the principles, operations, and values of both traditional and decentralized organizations. Dewiz is dedicated to working closely with DAOs, SubDAOs, projects, and traditional organizations to ensure that its team of engineers supports the transparency, communications, and preferred delivery method of smart contracts for clients. Our payment options and cycles are flexible to support a variety of engagement types, ranging from streams, On-Chain payments, and integrations with payment platforms.\n        '
    )
    .addScope({
      id: '1',
      code: 'SUP',
      name: 'Support Scope',
    })
    .addScope({
      id: '3',
      code: 'STA',
      name: 'Stability Scope',
    })
    .withSocials(defaultSocials)
    .build(),
  new EcosystemActorBuilder()
    .withId('23')
    .withCode('PH-001')
    .withName('Zoenix Labs')
    .withType(ResourceType.EcosystemActor)
    .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
    .addCategory('Active Ecosystem Actor')
    .addScope({
      id: '1',
      code: 'SUP',
      name: 'Support Scope',
    })
    .addScope({
      id: '3',
      code: 'STA',
      name: 'Stability Scope',
    })
    .withSocials(defaultSocials)
    .build(),
];

const meta: Meta<typeof ActorAboutContainer> = {
  title: 'Pages/Actor About',
  component: ActorAboutContainer,
  decorators: [withoutSBPadding],
  parameters: {
    nextjs: {
      router: {
        pathname: '/ecosystem-actors',
        path: '/ecosystem-actors/[code]',
        asPath: '/ecosystem-actors/DEWIZ',
        query: {
          code: 'DEWIZ',
        },
      },
    },
    chromatic: {
      viewports: [768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    actors: actorsItems,
    actor: actorsItems[0],
    code: 'DEWIZ',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <ActorAboutContainer {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs
);
export { LightMode, DarkMode };

LightMode.parameters = {};

DarkMode.parameters = {};
