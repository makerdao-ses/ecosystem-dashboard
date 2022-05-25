import React from 'react';
import RelateMips from './relate-mips';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CuMip } from '../../containers/cu-about/cu-about.api';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { DateTime } from 'luxon';

export default {
  title: 'Components/CUAbout/RelateMips',
  component: RelateMips
} as ComponentMeta<typeof RelateMips>;

const Template: ComponentStory<typeof RelateMips> = (args) => <RelateMips {...args} />;
export const WithData = Template.bind({});
WithData.args = {
  relateMips: {
    mipTitle: 'MIP39c2-SP10: Adding Sustainable Ecosystem Scaling Core Unit',
    mipUrl: 'https://mips.makerdao.com/mips/details/MIP39c2SP10',
    mipStatus: CuStatusEnum.Accepted,
    accepted: '2019-06-11',
    obsolete: '2019-06-11',
    rfc: '2019-06-11',
    cuId: '1',
    mipCode: 'MIP39c2-SP10',
    formalSubmission: '2019-06-11',
    rejected: '2019-06-11',
  } as CuMip
};
