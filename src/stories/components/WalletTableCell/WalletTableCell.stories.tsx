import React from 'react';
import { WalletTableCell } from './WalletTableCell';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUTransparencyReport/WalletTableCell',
  component: WalletTableCell,
} as ComponentMeta<typeof WalletTableCell>;

const Template: ComponentStory<typeof WalletTableCell> = (args) => <WalletTableCell {...args} />;

export const Default = Template.bind({});
Default.args = {
  wallet: '0x232b…8482',
  name: 'Permanent Team',
};
