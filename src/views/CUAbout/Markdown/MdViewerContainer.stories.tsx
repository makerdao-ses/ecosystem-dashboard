import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import MdViewerContainer from './MdViewerContainer';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof MdViewerContainer> = {
  title: 'Fusion/CuAbout/MdViewerContainer',
  component: MdViewerContainer,
};
export default meta;
const sentenceDescription =
  'SES aims to sustainably grow the Maker Protocol’s moats by removing barriers between decentralized workforce, capital, and work.';
const paragraphDescription =
  '**Vision**\n    \n    An effective, decentralized, and scalable ecosystem:\n    \n    1. The industry’s best on-boarding experience and retention rate\n    2. Easy to find the capital needed for the best projects to work on:\n        1. Optimal driving force for protocol growth\n        2. Most fulfilling for the project’s participants\n    3. Resilient safety mechanisms\n        1. Preventing protocol failure\n        2. Allow for rapid innovation and experimentation\n \n **Strategy**\n \n    - Opportunity & Risk Assessment\n        - Engage with the different DAO stakeholders and keep an open backlog accessible to the broader Community.\n        - Prioritize issues based on importance and risk and build a Road Map to tackle these issues.\n    - Research\n        - Research the opportunities and issues, with a data-centric approach.\n        - Explore solutions and frameworks that produce high-quality, repeatable results.\n    - Incubate\n        - Set groups for success into becoming a functional Core Unit answering a specific need for the DAO. Guide and support them through the process.\n        - Feedback the research through continuous improvement to accelerate the scale and improve the success rate of new Core Units.';
const paragraphImage = 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/diagram.png';
const variantsArgs = [
  {
    sentenceDescription,
    paragraphDescription,
    paragraphImage,
    showButton: false,
    queryStrings: '',
    code: '',
    shortCode: '',
    auditors: [],
    budgetPath: '',
  },
];
const [[CoreUnitItem, CoreUnitItemDark]] = createThemeModeVariants(MdViewerContainer, variantsArgs);
export { CoreUnitItem, CoreUnitItemDark };
