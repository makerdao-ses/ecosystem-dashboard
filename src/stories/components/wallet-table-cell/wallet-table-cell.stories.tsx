import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WalletTableCell } from './wallet-table-cell';

export default {
  title: 'Components/CUTransparencyReport/WalletTableCell',
  component: WalletTableCell
} as ComponentMeta<typeof WalletTableCell>;

const Template: ComponentStory<typeof WalletTableCell> = (args) => <WalletTableCell {...args} />;

export const Default = Template.bind({});
Default.args = {
  wallet: '0x232b…8482',
  name: 'Permanent Team',
};
