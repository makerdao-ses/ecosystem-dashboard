import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { SES_DASHBOARD } from '@/core/utils/const';
import { ButtonLinkStyled, ContainerLinks, ContainerLinksButton, LabelLinks } from '../CuAboutView';
import CardSomethingWrong from './CardSomethingWrong';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CardSomethingWrong> = {
  title: 'Fusion/CUAbout/CardSomethingWrong',
  component: CardSomethingWrong,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    title: 'Is this your core unit?',
    linkText: 'Join Powerhouse discord #dashboard-reporting channel',
  },
];

const [[Card, CardDark]] = createThemeModeVariants(
  (props) => (
    <CardSomethingWrong {...props}>
      <ContainerLinks>
        <LabelLinks>Important Links</LabelLinks>
        <ContainerLinksButton>
          <ButtonLinkStyled href={`${SES_DASHBOARD}`}>Join SES channel</ButtonLinkStyled>
        </ContainerLinksButton>
      </ContainerLinks>
    </CardSomethingWrong>
  ),

  variantsArgs
);
export { Card, CardDark };

Card.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1244:31477&t=dnHpLLwDPTMlUhGb-4',

        options: {
          style: {
            left: -12,
            top: 0,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1267:41992&t=dnHpLLwDPTMlUhGb-4',

        options: {
          style: {
            left: -12,
            top: 0,
          },
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1237:20955&t=dnHpLLwDPTMlUhGb-4',
        options: {
          style: {
            left: -12,
            top: 0,
          },
          componentStyle: {
            width: 386,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1237:19722&t=dnHpLLwDPTMlUhGb-4',
        options: {
          style: {
            left: -12,
            top: 0,
          },
          componentStyle: {
            width: 379,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1020:18954&t=dnHpLLwDPTMlUhGb-4',
        options: {
          style: {
            left: -12,
            top: 0,
          },
          componentStyle: {
            width: 416,
          },
        },
      },
    },
  },
};

CardDark.parameters = {};
